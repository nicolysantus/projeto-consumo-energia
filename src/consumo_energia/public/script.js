// Utiliza a API real do backend
const API_URL = 'http://localhost:3000/consumo-energia';

async function mostrar(tipo) {
  const lista = document.getElementById('historico');
  lista.innerHTML = '';

  // Busca todos os registros do back-end
  const dataInicio = '2000-01-01';
  const dataFim = '2100-12-31';

  let dados = [];
  try {
    const res = await fetch(`${API_URL}/historico?dataInicio=${dataInicio}&dataFim=${dataFim}`);
    dados = await res.json();
  } catch (e) {
    lista.innerHTML = '<p style="color:#a00">Erro ao buscar histórico.</p>';
    return;
  }

  // Se quiser filtrar por usuário, pode usar:
  // const usuarioId = localStorage.getItem('usuarioId');
  // if (usuarioId) dados = dados.filter(item => item.usuarioId === usuarioId);

  if (tipo === 'alertas') {
    dados = dados.filter(item => item.quantidadeKwh >= 180);
  }

  if (dados.length === 0) {
    lista.innerHTML = '<p style="color:#888">Nenhum registro encontrado.</p>';
    return;
  }

  dados.forEach(user => {
    const div = document.createElement('div');
    div.className = 'card' + (user.quantidadeKwh >= 180 ? ' alerta' : '');
    const mensagem = user.quantidadeKwh >= 180 ? 'Consumo elevado!' : 'Sem alertas.';
    const icone = user.quantidadeKwh >= 180 ? 'alerta.png' : 'check.png';
    div.innerHTML = `
      <img src="assets/lixeira.png" alt="Excluir" class="lixeira-icone" style="position:absolute;top:6px;right:8px;width:18px;height:18px;cursor:pointer;z-index:3;" title="Excluir registro" />
      <div class="card-content-left">
        <p class="nome">${user.usuarioId}</p>
        <p class="consumo">${user.quantidadeKwh} kWh</p>
      </div>
      <div class="card-content-middle">
        <p class="data">${formatarDataExtenso(user.dataLeitura)}</p>
        <p class="mensagem">${mensagem}</p>
      </div>
      <div class="card-content-right">
        <img src="assets/${icone}" alt="Ícone status" />
      </div>
    `;
    // Exclui imediatamente ao clicar
    const lixeira = div.querySelector('.lixeira-icone');
    lixeira.addEventListener('click', async (e) => {
      e.stopPropagation();
      try {
        const resp = await fetch(`${API_URL}/${user.id}`, { method: 'DELETE' });
        const result = await resp.json();
        if (resp.ok && result.success) {
          mostrar('historico');
        } else {
          alert(result.message || 'Erro ao excluir registro.');
          mostrar('historico'); // Garante atualização visual mesmo se der erro
        }
      } catch (err) {
        alert('Erro ao excluir registro.');
        mostrar('historico'); // Garante atualização visual mesmo se der erro
      }
    });
    div.style.position = 'relative';
    lista.appendChild(div);
  });
}

function formatarDataExtenso(dataStr) {
  const data = new Date(dataStr);
  return data.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long'
  });
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = 'flex';
    modal.scrollTop = 0;
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = 'none';
  }
}

async function registrar() {
  const nome = document.getElementById('nome').value.trim();
  const quantidade = parseInt(document.getElementById('quantidade').value);
  const data = document.getElementById('data').value;

  if (nome && quantidade && data) {
    try {
      await fetch(`${API_URL}/registrar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuarioId: nome, quantidadeKwh: quantidade, dataLeitura: data })
      });
      closeModal('modalRegistro');
      mostrar('historico');
    } catch (e) {
      alert('Erro ao registrar consumo!');
    }
  }
}

// Inicializa com histórico
mostrar('historico');

async function obterTemperatura() {
  try {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-23.55&longitude=-46.63&current_weather=true');
    const data = await response.json();
    return data.current_weather ? Math.round(data.current_weather.temperature) : null;
  } catch (error) {
    return null;
  }
}

async function atualizarCardTemperatura() {
  const dataElemento = document.querySelector('.data-dia');
  const temperaturaElemento = document.querySelector('.graus');

  dataElemento.textContent = formatarDataPorExtenso();

  const temperatura = await obterTemperatura();
  if (temperatura !== null) {
    temperaturaElemento.textContent = `${temperatura}ºC`;
  } else {
    temperaturaElemento.textContent = 'N/A';
  }
}

setInterval(atualizarCardTemperatura, 60000);
document.addEventListener('DOMContentLoaded', atualizarCardTemperatura);

function formatarDataPorExtenso() {
  const data = new Date();
  const opcoes = { weekday: 'long', day: '2-digit', month: 'long' };
  let texto = data.toLocaleDateString('pt-BR', opcoes);
  texto = texto.charAt(0).toUpperCase() + texto.slice(1);
  return texto;
}