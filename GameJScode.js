const cards = document.querySelectorAll(".memoryCard");
var isFlipped = false;
var firstCard, secondCard;
var lock = false;
cards.forEach(card => card.addEventListener("click", flip));
function flip() {
		if (lock) return;
		if (this === firstCard) return;
		
		if(!isFlipped) {
			isFlipped = true;
			firstCard = this;
			firstCard.classList.add("flip");
			return;
		}
		else{
			secondCard = this;
			secondCard.classList.add("flip");
			check();
		}
}
function check() {
		var isMatch = firstCard.dataset.image === secondCard.dataset.image;
		isMatch ? succes() : fail();
}
function succes() {
		firstCard.removeEventListener("click", flip);
		secondCard.removeEventListener( "click", flip);
		reset();
}
function fail() {
		lock = true;  // this helps to preven any click action while we reset the unmatched cards
		setTimeout(() => {
				firstCard.classList.remove("flip");
				secondCard.classList.remove ("flip");
				reset();
		}, 1000);
}
function reset() {
		[isFlipped, lock] = [false, false];
		[firstCard, secondCard] = [null, null];
}

//self executing func
(function shuffle() {
		cards.forEach( card => {
				var position = Math.floor(Math.random() * 16);
				card.style.order = position;
		});
})();