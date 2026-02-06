// Cache DOM references so we don't repeatedly query the DOM 
const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

// Static dataset used as our source of truth for autocomplete
const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

// Takes input string and returns matching fruits
// No DOM manipulation to keep logic separate from UI
function search(str) {
	const term = str.trim().toLowerCase(); // trim removes extra space, lowercase removes case sensitivity
	if (term === '') return []; // no suggestions if input is empty
	return fruit.filter(f => f.toLowerCase().includes(term)); // string or charachters contained anywhere 
}
//Time Complexity: O(n) - we iterate through fruits array once

//User typing triggers search
function searchHandler(e) {
	const inputVal = e.target.value; // reads current text input
	const results = search(inputVal); //computes matching fruits
	showSuggestions(results, inputVal); // displays results on page
}

// Responsible for rendering suggestion results into the DOM
// Converts filtered data into visible UI elements
function showSuggestions(results, inputVal) {
	const term = inputVal.trim();
	suggestions.innerHTML = ''; // clears old suggestions to update list as you type

	if (term === '' || results.length === 0) return; // if no input or no match, show nothing

	const lowerTerm = term.toLowerCase();

	const html = results // highlight the matched substring for better UX (user experience)
	.map(item => { // map transforms each matching fruit into an html list item
		const lowerItem = item.toLowerCase();
		const idx = lowerItem.indexOf(lowerTerm);
		const before = item.slice(0, idx);
		const match = item.slice(idx, idx + term.length);
		const after = item.slice(idx + term.length);

		return `<li><strong>${before}${match}</strong>${after}</li>`;
	})
	.join(''); // join combines them into one big html string

suggestions.innerHTML = html;
}

function useSuggestion(e) { // detect suggestion clicked, add value to input, and clear dropdown
	if (e.target.tagName.toLowerCase() !== 'li' && e.target.tagName.toLowerCase() !== 'strong') return;

	const li = e.target.closest('li'); // handles clicks on <strong> inside the <li>
	if (!li) return;

	input.value = li.innerText; // copies the visible text
		suggestions.innerHTML = '';
}

input.addEventListener('keyup', searchHandler); // event listeners - input value updated after key press
suggestions.addEventListener('click', useSuggestion); // triggers selecting a fruit