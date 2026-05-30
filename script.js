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

// ==========================================
// INICIALIZAÇÃO
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    checarHorarioFuncionamento();
    setInterval(checarHorarioFuncionamento, 60000);
});