import React, { Component } from 'react';

class Results extends Component {
  render() {
    return (
      <div className='results'>
        
      </div>
    );
  }
}

export default Results;


// import { createElement } from '../utility';
// import Card from '../CardList/Card';

// export default class Results {
//   constructor() {
//     this.errorsNum = createElement('spann', 'errors-num');
//     this.succesNum = createElement('span', 'succes-num');
//     this.errorCardsElement = createElement('div', 'error-cards');
//     this.succesCardsElement = createElement('div', 'succes-cards');
//     this.buildElement();
//     this.setButtonsListener();
//   }

//   buildElement() {
//     this.resultsElement = createElement('div', 'results', 'hidden');
//     this.container = createElement('div', 'results-container');
//     this.resultsElement.append(this.container);

//     const errors = createElement('p', 'errors');
//     errors.innerText = 'Errors:';
//     errors.append(this.errorsNum);

//     const succes = createElement('p', 'succes');
//     succes.innerText = 'You know: ';
//     succes.append(this.succesNum);

//     const btns = createElement('div', 'btns', 'btns-res');
//     btns.insertAdjacentHTML('afterbegin', `
//       <a href="#" class="btn btn-res return">Return</a>
//       <a href="#" class="btn btn-res new-game">New game</a>
//       <a href="#" class="btn btn-res btn-stat">Statistics</a>
//     `);

//     this.statisticsElement = createElement('div', 'stat-container', 'hidden');

//     this.container.append(errors);
//     this.container.append(this.errorCardsElement);
//     this.container.append(succes);
//     this.container.append(this.succesCardsElement);
//     this.container.append(btns);
//     this.resultsElement.append(this.statisticsElement);
//   }

//   buildStatHead() {
//     this.statisticsElement.insertAdjacentHTML('afterbegin', `
//     <h3 class="title-stat">Statistics</h3>
//     <table class="table-stat">
//       <thead>
//         <tr class="table-head">
//           <th class="th-date">Date</th>
//           <th class="th-time">Time</th>
//           <th class="th-succes">Succes</th>
//           <th class="th-errors">Errors</th>
//           <th class="th-option">Link</th>
//         </tr>
//       </thead>
//       <tbody></tbody>
//     </table>
//     `);
//   }

//   render(container) {
//     return container.append(this.resultsElement);
//   }

//   setButtonsListener() {
//     this.resultsElement.addEventListener('click', (e) => this.determinateTarget(e));
//   }

//   determinateTarget(e) {
//     if (e.target.classList.contains('return')) {
//       return this.hideResultModal(e.target);
//     }
//     if (e.target.classList.contains('btn-stat')) {
//       return this.showStatistics();
//     }
//     if (e.target.classList.contains('new-game')) {
//       return this.saveResult();
//     }
//     if (e.target.classList.contains('result-link')) {
//       return this.findResult(e.target);
//     }
//     return -1;
//   }

//   hideResultModal(target) {
//     if (!target.classList.contains('btn-stat')) {
//       this.resultsElement.classList.add('hidden');
//     }
//     this.statisticsElement.classList.add('hidden');
//     this.container.classList.remove('hidden');
//     document.getElementById('app-container').style.overflow = 'auto';
//   }

//   showResult(cards) {
//     this.cards = cards;
//     this.errorCards = cards.filter((card) => !card.cardElement.classList.contains('active-card'));
//     this.errorsNum.innerText = this.errorCards.length;
//     this.errorCardsElement.innerHTML = '';
//     this.errorCards.forEach((card) => {
//       this.errorCardsElement.append(card.cardElement.cloneNode(true));
//     });

//     this.succesCards = cards.filter((card) => card.cardElement.classList.contains('active-card'));
//     this.succesNum.innerText = this.succesCards.length;
//     this.succesCardsElement.innerHTML = '';
//     this.succesCards.forEach((card) => {
//       this.succesCardsElement.append(card.cardElement.cloneNode(true));
//     });
//   }

//   showStatistics() {
//     this.statisticsElement.classList.remove('hidden');
//     this.container.classList.add('hidden');
//     this.statisticsElement.innerHTML = '';
//     this.buildStatHead();
//     if (!localStorage.stat) {
//       return this.addMessageToStat();
//     }
//     return this.buildStatTable();
//   }

//   buildStatTable() {
//     const statistics = JSON.parse(localStorage.stat);
//     const keys = Object.keys(statistics);
//     const tBody = this.statisticsElement.querySelector('.table-stat').tBodies[0];
//     keys.forEach((key) => tBody.insertAdjacentHTML('beforeend', `
//       <tr>
//         <td>${key.split(', ')[0]}</td>
//         <td>${key.split(', ')[1]}</td>
//         <td>${statistics[key].succes}</td>
//         <td>${statistics[key].errors}</td>
//         <td>
//           <a href="#" class="result-link">Show</a>
//         </td>
//       </tr>
//     `));
//   }

//   findResult(target) {
//     const statistics = JSON.parse(localStorage.stat);
//     const targetRow = target.parentNode.parentNode;
//     const key = `${targetRow.children[0].innerText}, ${targetRow.children[1].innerText}`;

//     this.errorCardsElement.innerHTML = '';
//     statistics[key].errorsCards.forEach((card) => {
//       this.errorCardsElement.append(new Card(card.state).getElement());
//     });
//     this.errorsNum.innerText = statistics[key].errorsCards.length;

//     this.succesCardsElement.innerHTML = '';
//     statistics[key].succesCards.forEach((card) => {
//       this.succesCardsElement.append(new Card(card.state).getElement());
//     });
//     this.succesNum.innerText = statistics[key].succesCards.length;

//     this.statisticsElement.classList.add('hidden');
//     this.container.classList.remove('hidden');

//     this.isStatActive = true;
//   }

//   saveResult() {
//     if (this.succesNum.innerText > 0 && !this.isStatActive) {
//       const data = localStorage.stat ? JSON.parse(localStorage.stat) : {};
//       data[new Date().toLocaleString()] = {
//         errors: this.errorsNum.innerText,
//         succes: this.succesNum.innerText,
//         errorsCards: this.errorCards,
//         succesCards: this.succesCards,
//       };
//       localStorage.stat = JSON.stringify(data);
//     }
//     this.isStatActive = false;
//   }

//   addMessageToStat() {
//     const message = createElement('div', 'message-stat');
//     message.innerHTML = `
//       <p> No statistics.
//       The result is saved when you click the "New Game" button. </p>
//       <a href="#" class="btn btn-stat return">Return</a>`;

//     this.statisticsElement.append(message);
//   }
// }
