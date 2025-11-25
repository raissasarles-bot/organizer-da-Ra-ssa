// ===================================
// NOTIFICATIONS & TIME FEATURES (V2)
// ===================================

// This file extends app.js with V2 features
// Load this after app.js

// Initialize notification features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initializeNotificationsV2, 100);
});

function initializeNotificationsV2() {
    updateNotificationStatus();

    const requestBtn = document.getElementById('requestNotificationBtn');
    const testBtn = document.getElementById('testNotificationBtn');

    if (requestBtn) {
        requestBtn.addEventListener('click', requestNotificationPermission);
    }

    if (testBtn) {
        testBtn.addEventListener('click', testNotification);
    }
}

function updateNotificationStatus() {
    const statusEl = document.getElementById('notificationStatus');
    if (!statusEl) return;

    if (!('Notification' in window)) {
        statusEl.textContent = '❌ Notificações não suportadas neste navegador';
        statusEl.style.color = '#ef4444';
        return;
    }

    const permission = Notification.permission;

    switch (permission) {
        case 'granted':
            statusEl.textContent = '✅ Notificações ativadas';
            statusEl.style.color = '#10b981';
            break;
        case 'denied':
            statusEl.textContent = '❌ Notificações bloqueadas';
            statusEl.style.color = '#ef4444';
            break;
        default:
            statusEl.textContent = '⚠️ Permissão não concedida';
            statusEl.style.color = '#f59e0b';
    }
}

async function requestNotificationPermission() {
    if (!('Notification' in window)) {
        alert('Seu navegador não suporta notificações.');
        return;
    }

    try {
        const permission = await Notification.requestPermission();
        updateNotificationStatus();

        if (permission === 'granted') {
            alert('✅ Notificações ativadas com sucesso!');
            testNotification();
        } else {
            alert('❌ Permissão de notificação negada.');
        }
    } catch (error) {
        console.error('Erro ao solicitar permissão:', error);
        alert('Erro ao solicitar permissão de notificação.');
    }
}

function testNotification() {
    if (Notification.permission !== 'granted') {
        alert('Por favor, ative as notificações primeiro.');
        return;
    }

    new Notification('Organizer da Raíssa', {
        body: 'As notificações estão funcionando! 🎉',
        icon: 'assets/icons/icon-192.png',
        badge: 'assets/icons/icon-192.png'
    });
}

function scheduleNotification(task) {
    if (!task.time || !task.reminder || task.reminder === 'none') {
        return;
    }

    if (Notification.permission !== 'granted') {
        return;
    }

    const taskDateTime = new Date(task.date + 'T' + task.time);
    const reminderMinutes = parseInt(task.reminder);
    const notificationTime = new Date(taskDateTime.getTime() - (reminderMinutes * 60 * 1000));
    const now = new Date();

    const timeUntilNotification = notificationTime.getTime() - now.getTime();

    if (timeUntilNotification > 0) {
        setTimeout(() => {
            new Notification('Lembrete: ' + task.title, {
                body: reminderMinutes > 0
                    ? `Em ${reminderMinutes} minutos`
                    : 'Agora!',
                icon: 'assets/icons/icon-192.png',
                badge: 'assets/icons/icon-192.png',
                tag: task.id
            });
        }, timeUntilNotification);
    }
}

// Override renderCurrentView to add settings support
const _originalRenderCurrentView = window.renderCurrentView;
window.renderCurrentView = function () {
    if (currentView === 'settings') {
        updateNotificationStatus();
    } else {
        _originalRenderCurrentView();
    }
};

// Override openTaskModal to include time and reminder fields
const _originalOpenTaskModal = window.openTaskModal;
window.openTaskModal = function (taskId = null) {
    _originalOpenTaskModal(taskId);

    const timeInput = document.getElementById('taskTime');
    const reminderInput = document.getElementById('taskReminder');

    if (taskId) {
        const task = tasks.find(t => t.id === taskId);
        if (timeInput) timeInput.value = task.time || '';
        if (reminderInput) reminderInput.value = task.reminder || 'none';
    } else {
        if (timeInput) timeInput.value = '';
        if (reminderInput) reminderInput.value = 'none';
    }
};

// Override saveTask to include time and reminder
const _originalSaveTask = window.saveTask;
window.saveTask = function () {
    const title = document.getElementById('taskTitle').value.trim();
    const description = document.getElementById('taskDescription').value.trim();
    const date = document.getElementById('taskDate').value;
    const time = document.getElementById('taskTime').value;
    const reminder = document.getElementById('taskReminder').value;
    const recurrence = document.getElementById('taskRecurrence').value;
    const selectedCategory = document.querySelector('.category-option.selected');

    if (!title || !date || !selectedCategory) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }

    if (reminder !== 'none' && !time) {
        alert('Para configurar um lembrete, você precisa definir um horário para a tarefa.');
        return;
    }

    const taskData = {
        title,
        description,
        date,
        time,
        reminder,
        recurrence,
        categoryId: selectedCategory.dataset.categoryId,
        completed: false
    };

    if (editingTaskId) {
        const taskIndex = tasks.findIndex(t => t.id === editingTaskId);
        tasks[taskIndex] = { ...tasks[taskIndex], ...taskData };
    } else {
        const newTask = {
            id: generateId(),
            ...taskData,
            createdAt: new Date().toISOString()
        };
        tasks.push(newTask);

        if (newTask.time && newTask.reminder !== 'none') {
            scheduleNotification(newTask);
        }
    }

    saveToLocalStorage();
    closeTaskModal();
    renderCurrentView();
};

// Override renderTaskItem to show time and calendar button
const _originalRenderTaskItem = window.renderTaskItem;
window.renderTaskItem = function (task) {
    const category = categories.find(c => c.id === task.categoryId);
    const recurrenceText = getRecurrenceText(task.recurrence);
    const timeText = task.time ? task.time.substring(0, 5) : '';
    const reminderText = task.reminder && task.reminder !== 'none'
        ? (task.reminder === '0' ? 'No horário' : `${task.reminder}min antes`)
        : '';

    return `
    <div class="task-item ${task.completed ? 'completed' : ''}" style="border-left-color: ${category?.color || '#a855f7'}">
      <div class="task-header">
        <div class="task-checkbox ${task.completed ? 'checked' : ''}" onclick="toggleTaskComplete('${task.id}')"></div>
        <div class="task-content">
          <div class="task-title">${escapeHtml(task.title)}</div>
          ${task.description ? `<p style="color: var(--text-secondary); font-size: var(--font-size-sm); margin-top: var(--spacing-xs);">${escapeHtml(task.description)}</p>` : ''}
          <div class="task-meta">
            <span class="task-category" style="color: ${category?.color || '#a855f7'}">
              ${category?.emoji || '📝'} ${category?.name || 'Sem categoria'}
            </span>
            ${timeText ? `<span class="task-time">⏰ ${timeText}</span>` : ''}
            ${reminderText ? `<span class="task-reminder">🔔 ${reminderText}</span>` : ''}
            ${recurrenceText ? `<span class="task-recurrence">🔄 ${recurrenceText}</span>` : ''}
          </div>
          <div class="task-actions">
            ${task.time ? `<button class="calendar-export-btn" onclick="addToCalendar('${task.id}')" title="Adicionar ao Calendário">📅 Calendário</button>` : ''}
            <button class="btn-icon" onclick="editTask('${task.id}')" title="Editar">✏️</button>
            <button class="btn-icon delete" onclick="deleteTask('${task.id}')" title="Excluir">🗑️</button>
          </div>
        </div>
      </div>
    </div>
  `;
};

// Override getTasksForDate to sort by time
const _originalGetTasksForDate = window.getTasksForDate;
window.getTasksForDate = function (dateStr) {
    const tasksForDate = _originalGetTasksForDate(dateStr);
    return tasksForDate.sort((a, b) => {
        if (!a.time && !b.time) return 0;
        if (!a.time) return 1;
        if (!b.time) return -1;
        return a.time.localeCompare(b.time);
    });
};
