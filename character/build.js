import { 
    checkAuth, 
    getCharacter,
    logout, 
    createCharacter,
    updateBottom,
    updateHead,
    updateMiddle,
    updateChatchphrases,
    client
} from '../fetch-utils.js';

checkAuth();

const headDropdown = document.getElementById('head-dropdown');
const middleDropdown = document.getElementById('middle-dropdown');
const bottomDropdown = document.getElementById('bottom-dropdown');
const headEl = document.getElementById('head');
const middleEl = document.getElementById('middle');
const bottomEl = document.getElementById('bottom');
const reportEl = document.getElementById('report');
const chatchphrasesEl = document.getElementById('chatchphrases');
const catchphraseInput = document.getElementById('catchphrase-input');
const catchphraseButton = document.getElementById('catchphrase-button');
const logoutButton = document.getElementById('logout');

// we're still keeping track of 'this session' clicks, so we keep these lets
let headCount = 0;
let middleCount = 0;
let bottomCount = 0;

headDropdown.addEventListener('change', async() => {
    // increment the correct count in state
    headCount++;
    // update the head in supabase with the correct data
    await updateHead(headDropdown.value);
    refreshData();
});

middleDropdown.addEventListener('change', async() => {
    // increment the correct count in state
    middleCount++;
    await updateMiddle(middleDropdown.value);
    
    // update the middle in supabase with the correct data
    refreshData();
});

bottomDropdown.addEventListener('change', async() => {
    // increment the correct count in state
    bottomCount++;
    await updateBottom(bottomDropdown.value);
    // update the bottom in supabase with the correct data
    refreshData();
});

catchphraseButton.addEventListener('click', async() => {
    // go fetch the old catch phrases
    const catchphrases = await client
        .from('characters')
        .select()
        .match({ user_id: client.auth.user().id, })
        .single();

        // update the catchphrases array locally by pushing the new catchphrase into the old array
    const oldArray = catchphrases.data.catchphrases;
    oldArray.push(catchphraseInput.value);
    
    // update the catchphrases in supabase by passing the mutated array to the updateCatchphrases function
    await updateChatchphrases(oldArray);

    catchphraseInput.value = '';
    refreshData();
});

window.addEventListener('load', async() => {
    let character;
    // on load, attempt to fetch this user's character
    const user = await getCharacter();
    console.log(user);
    
    if (!user) {
        character = {
            head: 'bird',
            middle: 'blue',
            bottom: 'blue',
            catchphrases: ["You're my boy Blue"]
        };
        await createCharacter(character);
    } else {
        headDropdown.value = user.head;
        middleDropdown.value = user.middle;
        bottomDropdown.value = user.bottom;
    }
    
    await fetchAndDisplayCharacter();

    // if this user turns out not to have a character
    // create a new character with correct defaults for all properties (head, middle, bottom, catchphrases)
    // and put the character's catchphrases in state (we'll need to hold onto them for an interesting reason);

    // then call the refreshData function to set the DOM with the updated data
    refreshData();
});

logoutButton.addEventListener('click', () => {
    logout();
});

function displayStats() {
    reportEl.textContent = `In this session, you have changed the head ${headCount} times, the body ${middleCount} times, and the pants ${bottomCount} times. And nobody can forget your character's classic catchphrases:`;
}

async function fetchAndDisplayCharacter() {
    headEl.textContent = '';
    middleEl.textContent = '';
    bottomEl.textContent = '';

    const currentUserId = client.auth.user().id;  
    // fetch the caracter from supabase
    let character = await client
        .from('characters')
        .select()
        .match({ user_id: currentUserId })
        .single();
    character = character.data;

    const head = character.head;
    const middle = character.middle;
    const bottom = character.bottom;
    const sayings = character.catchphrases;
    const headImg = document.createElement('img');
    const middleImg = document.createElement('img');
    const bottomImg = document.createElement('img');

    // if the character has a head, display the head in the dom
    if (head) {
        headImg.src = `../assets/${head}-head.png`;
        headEl.append(headImg);
    }
    
    // if the character has a middle, display the middle in the dom
    if (middle) {
        middleImg.src = `../assets/${middle}-middle.png`;
        middleEl.append(middleImg);
    }

    // if the character has a pants, display the pants in the dom
    if (bottom) {
        bottomImg.src = `../assets/${bottom}-pants.png`;
        bottomEl.append(bottomImg);
    }
    
    // loop through catchphrases and display them to the dom (clearing out old dom if necessary)
    chatchphrasesEl.textContent = '';
    for (const saying of sayings) {
        const phraseEl = document.createElement('p');
        phraseEl.textContent = saying;
        chatchphrasesEl.append(phraseEl);
    }
}

function refreshData() {
    displayStats();
    fetchAndDisplayCharacter();
}
