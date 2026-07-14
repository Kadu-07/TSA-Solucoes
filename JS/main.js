document.querySelectorAll('.carousel').forEach(carousel => {
    const faixa     = carousel.querySelector('.carousel-faixa');
    const cards     = carousel.querySelectorAll('.card');
    const btnAnt    = carousel.querySelector('.carousel-btn-ant');
    const btnProx   = carousel.querySelector('.carousel-btn-prox');
    const pontosDiv = carousel.querySelector('.carousel-ponto');

    let slideAtual = 0;

    // Verificicar se é um celular
    function isMobile() {
        return window.innerWidth <= 768;
    }


    // Quantos cards cabem por vez, dependendo da largura da tela
    function visiveis() {
        if (window.innerWidth <= 768)  return 1;
        if (window.innerWidth <= 1280) return 2;
        return 3;
    }

    // Total de slides
    function totalSlides() {
        return cards.length - visiveis();
    }

    // Cria os pontos dinamicamente conforme o total de slides
    function criarPontos() {
        pontosDiv.innerHTML = '';
        const total = totalSlides();
        for (let i = 0; i <= total; i++) {
            const ponto = document.createElement('button');
            ponto.addEventListener('click', () => irPara(i));
            pontosDiv.appendChild(ponto);
        }
    }

    // Move o carrossel para o slide indicado
    function irPara(index) {
        const total = totalSlides();

        if (index < 0) {
            slideAtual = total;
        } else if (index > total) {
            slideAtual = 0
        } else {
            slideAtual = index
        }

         if (isMobile()) {
            // No mobile, rola o container nativamente até o card
            const card = cards[slideAtual];
            faixa.scrollTo({
                left: card.offsetLeft - faixa.offsetLeft,
                behavior: 'smooth'
            });
        } else {
            // No desktop, continua usando translateX
            const larguraCard = cards[0].offsetWidth + 20;
            faixa.style.transform = `translateX(${-slideAtual * larguraCard}px)`;
        }

        // // Largura de um card + gap (20px)
        atualizarPontos()
    }

    function atualizarPontos() {
        pontosDiv.querySelectorAll('button').forEach((btn, i) => {
            btn.classList.toggle('ativo', i === slideAtual);
        });
    }

    let scrollTimeout;
    faixa.addEventListener('scroll', () => {
        if (!isMobile()) return;

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const larguraCard = cards[0].offsetWidth + 20;
            const indexMaisProximo = Math.round(faixa.scrollLeft / larguraCard);
            slideAtual = Math.min(indexMaisProximo, totalSlides());
            atualizarPontos();
        }, 0);
    });

    btnAnt.addEventListener('click',  () => irPara(slideAtual - 1));
    btnProx.addEventListener('click', () => irPara(slideAtual + 1));

    // Reinicia ao redimensionar a janela
    let larguraAnterior = window.innerWidth;

    window.addEventListener('resize', () => {
        const larguraAtual = window.innerWidth;
        
        if (larguraAtual === larguraAnterior) return;

        larguraAnterior = larguraAtual;

        criarPontos();
        irPara(0);
        faixa.style.transform = `translateX(0px)`;
    });

    // Inicializa
    criarPontos();
    irPara(0);
});

function enviarFormulario(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const email = document.getElementById('email').value;
    const assunto = document.getElementById('assunto').value;
    const mensagem = document.getElementById('mensagem').value;
    const texto = `Olá! Me chamo *${nome} ${sobrenome}* (${email}).\n\n*Assunto:* ${assunto}\n\n${mensagem}`;
    const url = `https://wa.me/5551990157080?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
}

function desactive() {
    if (document.getElementById('menu-toggle').checked == true) {
        document.getElementById('menu-toggle').checked = false
    }
}

const themeToggle = document.getElementById('theme-toggle');
const iconmoon = document.getElementById('icon-moon')
const iconsun = document.getElementById('icon-sun')
const html = document.documentElement;

const temaSalvo = localStorage.getItem('tema') || 'dark';
html.setAttribute('data-theme', temaSalvo);
atualizarIcone(temaSalvo);

themeToggle.addEventListener('click', () => {
    const temaAtual = html.getAttribute('data-theme');
    const novoTema = temaAtual === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', novoTema);
    localStorage.setItem('tema', novoTema);
    atualizarIcone(novoTema);
})

function atualizarIcone(tema) {
    if (tema === 'dark') {
        iconmoon.style.display = 'block';
        iconsun.style.display = 'none';
        document.querySelectorAll('img[src="./ASSETS/Logo TSA - Flex Light Mode.png"]').forEach(img => {
            img.src = './ASSETS/Logo TSA - Flex Dark Mode.png';
        });
    } else {
        iconsun.style.display = 'block';
        iconmoon.style.display = 'none';
        document.querySelectorAll('img[src="./ASSETS/Logo TSA - Flex Dark Mode.png"]').forEach(img => {
            img.src = './ASSETS/Logo TSA - Flex Light Mode.png';
        });
    }
}