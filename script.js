// ==========================================
// CONFIGURAÇÃO DA PLANILHA (O Cérebro da Loja)
// ==========================================
const URL_PLANILHA = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0kfNS_Q5ZidRXjo-oUxUwhTUTmH1o-mGMPUh1v-5OYV_mJ8lYyfUozpSm25txuCUYpCezmowgkB2Y/pub?gid=1596392114&single=true&output=tsv";
let statusForcado = 'NORMAL';

// ==========================================
// CONTROLO DOS MODAIS INTERATIVOS
// ==========================================
function abrirModalInfo(id) { 
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('hidden');
        const box = modal.querySelector('.bg-white');
        if (box) box.classList.add('scale-in');
    }
}

function fecharModalInfo(id) { 
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('hidden'); 
}

// ==========================================
// SISTEMA DE VALIDAÇÃO DE HORÁRIO LOCAL
// ==========================================
function checarHorarioFuncionamento() {
    const agora = new Date();
    const diaSemana = agora.getDay(); 
    const hora = agora.getHours();
    const minuto = agora.getMinutes();
    const minutosAtuaisDoDia = (hora * 60) + minuto;

    let aberto = false;

    if (diaSemana >= 1 && diaSemana <= 5) {
        if (minutosAtuaisDoDia >= 540 && minutosAtuaisDoDia < 1140) aberto = true;
    } else if (diaSemana === 6) {
        if (minutosAtuaisDoDia >= 540 && minutosAtuaisDoDia < 1080) aberto = true;
    }

    // --- LÓGICA DE INTERVENÇÃO MANUAL DA PLANILHA ---
    if (statusForcado === 'ABERTO') aberto = true;
    if (statusForcado === 'FECHADO') aberto = false;
    // ------------------------------------------------

    const spanStatus = document.getElementById('status-loja-links');
    if (!spanStatus) return;

    if (aberto) {
        spanStatus.innerText = "🟢 ABERTO PARA PEDIDOS";
        spanStatus.className = "text-[11px] font-bold tracking-widest uppercase py-2 px-4 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.15)] animate-pulse";
    } else {
        spanStatus.innerText = "🔴 FECHADO NO MOMENTO";
        spanStatus.className = "text-[11px] font-bold tracking-widest uppercase py-2 px-4 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.15)]";
    }
}

// ==========================================
// LEITURA DO STATUS NA PLANILHA
// ==========================================
async function buscarStatusPlanilha() {
    try {
        const urlSemCache = URL_PLANILHA + "&t=" + new Date().getTime();
        const response = await fetch(urlSemCache);
        const data = await response.text();
        
        const delimitador = data.includes('\t') ? '\t' : (data.includes(';') ? ';' : ',');
        const linhas = data.split('\n');
        
        // Procura a linha de configuração (ignorando o cabeçalho)
        for (let i = 1; i < linhas.length; i++) {
            const colunas = linhas[i].split(delimitador);
            if (colunas.length > 3) {
                const categoria = colunas[2] ? colunas[2].trim().toUpperCase() : '';
                const statusUnidade = colunas[3] ? colunas[3].trim().toUpperCase() : '';
                
                if (categoria === 'CONFIGURACAO' || categoria === 'CONFIGURAÇÃO') {
                    statusForcado = statusUnidade;
                    break; // Achou a ordem da Katia, pode parar de ler o resto
                }
            }
        }
    } catch (erro) {
        console.warn("Erro ao ler status da planilha, usando horário automático:", erro);
    } finally {
        checarHorarioFuncionamento();
    }
}

// Inicialização: Mostra a etiqueta e começa a monitorizar a planilha
document.addEventListener('DOMContentLoaded', () => {
    checarHorarioFuncionamento(); // Mostra o horário automático instantaneamente
    buscarStatusPlanilha(); // Vai à planilha ver se a Katia forçou alguma coisa
    setInterval(buscarStatusPlanilha, 60000); // Atualiza a cada 1 minuto
});

// ==========================================
// 🔒 TRAVA DE SEGURANÇA CLIENT-SIDE
// ==========================================
document.addEventListener('contextmenu', event => event.preventDefault());

document.onkeydown = function(e) {
    if(e.key === 'F12' || e.keyCode === 123) return false;
    if(e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) return false;
    if(e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c')) return false;
    if(e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j')) return false;
    if(e.ctrlKey && (e.key === 'U' || e.key === 'u')) return false;
};