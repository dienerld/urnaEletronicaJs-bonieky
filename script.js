const position = document.querySelector('.text-voting span');
const infoCandidate = document.querySelector('.info-candidate');
const footer = document.querySelector('.footer');
const photos = document.querySelector('.photo-candidates');
const numbers = document.querySelector('.number-candidate');

let currentStage = 0;
let i = 0;
let isConfirmed = false;
let isWhite = false;
const timeout = 5000;

let numberHTML = '';
let stage = '';

const clearScreen = () => {
	footer.style.display = 'block';
	photos.innerHTML = '';
	position.innerHTML = '';
	infoCandidate.innerHTML = '';
	footer.style.display = 'none';
	numbers.innerHTML = '';
};

const setStage = () => {
	stage = etapas[currentStage];
	numberHTML = '';
	position.innerHTML = stage.function;
	infoCandidate.innerHTML = '';
	footer.style.display = 'none';
	photos.innerHTML = '';
	numbers.innerHTML = numberHTML;
	numbers.innerHTML += '<div class="number-display pisca"></div>';
};

const handleClick = (number) => {
	if (numberHTML.length < stage.numbers) {
		divPisca = document.querySelector('.number-display.pisca');
		divPisca.innerHTML = number;
		numberHTML = `${numberHTML}${number}`;
		divPisca.classList.remove('pisca');
		if (numberHTML.length < stage.numbers)
			numbers.innerHTML += '<div class="number-display pisca"></div>';
		else {
			updateInterface();
		}
	}
};

const updateInterface = () => {
	var candidate = stage.candidates.filter((item) => {
		if (item.number == numberHTML) return true;
		else return false;
	})[0];
	if (candidate) {
		footer.style.display = 'block';
		infoCandidate.innerHTML = `NOME:${candidate.name} <br/>PARTIDO:${candidate.partido}`;
		let divPhotos = '';
		for (let i in candidate.imagens) {
			divPhotos += `<div class="image">
			<img src="${candidate.imagens[i].url}" alt="" />
			${candidate.imagens[i].legenda}
		</div>`;
		}
		photos.innerHTML = divPhotos;
	} else {
		footer.style.display = 'block';
		infoCandidate.innerHTML = `<div class="alert-big pisca">VOTO NULO</div>`;
	}
};

const handleClickWhite = () => {
	if (numberHTML.length <= 0) {
		isWhite = true;
		footer.style.display = 'block';
		numbers.innerHTML = '';
		infoCandidate.innerHTML = `<div class="alert-big pisca">VOTO EM BRANCO</div>`;
	} else {
		alert('Não pode conter números nos espaços');
	}
	console.log(`Clicou em BRANCO`);
};

const handleClickCorrect = () => {
	setStage();
	console.log(`Clicou em CORRIGE`);
};

const Candidate = () => {
	api = stage.candidates.filter((candidate) => {
		if (candidate.number === parseInt(numberHTML)) {
			return `${candidate.name}  PARTIDO: ${candidate.partido}`;
		}
	})[0];
	if (api) {
		const { name, partido } = api;
		return `\n${name}\nPartido: ${partido}`;
	} else {
		return `VOTO NULO`;
	}
};

const handleClickConfirm = () => {
	if (isWhite) {
		clearScreen();
		alert('Voto confirmado como Branco');
		console.log('Voto confirmado como Branco');
	} else if (numberHTML.length == stage.numbers) {
		clearScreen();
		alert(`Votou no Candidato ${Candidate()}`);

		setTimeout(() => {
			currentStage++;
			if (currentStage < etapas.length) {
				setStage();
			} else {
				infoCandidate.innerHTML = `<div class="alert-big">FIM</div>`;
				setTimeout(() => {
					currentStage = 0;
					setStage();
				}, timeout * 2);
			}
		}, 500);
	}
	console.log(`Clicou em CONFIRMA`);
};
setStage();
