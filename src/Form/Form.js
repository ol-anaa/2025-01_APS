const state = {
    currentStep: 1,
    data: {
        regiao: '',
        nome: '',
        email: '',
        telefone: ''
    }
};

const steps = [
    {
        id: 1,
        title: 'Selecione sua região',
        content: () => `
            <select id="regiao">
                <option>Região</option>
                <option>Campinas</option>
                <option>Minas Gerais</option>
                <option>São Paulo</option>
            </select>
        `,
        validate: () => {
            const value = document.getElementById('regiao').value;

            if (!value || value === 'Região') {
                alert('Por favor, selecione uma região.');
                return false;
            }

            state.data.regiao = value;
            return true;
        }
    },
    {
        id: 2,
        title: 'Digite seu nome',
        content: () => `
            <input 
                type="text" 
                id="nome" 
                class="form-input" 
                placeholder="Seu nome completo" 
            />
        `,
        validate: () => {
            const value = document.getElementById('nome').value.trim();

            if (!value) {
                alert('Por favor, digite seu nome.');
                return false;
            }

            state.data.nome = value;
            return true;
        }
    },
    {
        id: 3,
        title: 'Seu melhor email',
        content: () => `
            <input 
                type="email" 
                id="email" 
                class="form-input" 
                placeholder="seu@email.com" 
            />
        `,
        validate: () => {
            const value = document.getElementById('email').value.trim();

            if (!value.includes('@')) {
                alert('Por favor, digite um email válido.');
                return false;
            }

            state.data.email = value;
            return true;
        }
    },
    {
        id: 4,
        title: 'Seu telefone',
        content: () => `
            <input 
                type="tel" 
                id="phone" 
                class="form-input" 
                placeholder="(00) 00000-0000" 
            />
        `,
        validate: () => {
            const value = document.getElementById('phone').value.trim();

            if (!/^(\d{10,11})$/.test(value.replace(/\D/g, ''))) {
                alert("Por favor, insira um telefone válido (DDD + número)");
                return false;
            }

            state.data.telefone = value;
            return true;
        }
    }
];

function renderStep() {
    const currentStep = steps.find(step => step.id === state.currentStep);

    let timelineHTML = '<div class="timeline">';
    steps.forEach(step => {
        timelineHTML += `
        <div class="step ${step.id === state.currentStep ? 'active' : ''}">
            ${step.id}
        </div>
    `;
    });
    timelineHTML += '</div>';

    document.querySelector('.form .timeline').outerHTML = timelineHTML;
    document.getElementById('title').innerText = currentStep.title;

    const field = document.getElementById('field');
    field.innerHTML = '';
    field.innerHTML = currentStep.content();

    const nextBtn = document.getElementById('next-btn');
    nextBtn.onclick = state.currentStep === steps.length ? submitForm : nextStep;
    nextBtn.innerText = state.currentStep === steps.length ? 'Enviar' : 'Próximo';
}

function nextStep() {
    const currentStep = steps.find(step => step.id === state.currentStep);

    if (currentStep.validate()) {
        state.currentStep++;
        renderStep();
    }
}

function submitForm() {
    if (steps[steps.length - 1].validate())
    {
        emailjs.send('', '', {
            name: state.data.nome,
            email: state.data.email
        })
            .then(() => {
                alert('E-mail enviado com sucesso!');
                window.location.href = '../Index/Index.html';
            })
            .catch((error) => {
                console.error('Falha ao enviar:', error);
                console.log(state.data.email)
            });
    }
}

document.addEventListener('DOMContentLoaded', renderStep);