// ===================================
// ORGANIZER DA RAÍSSA - APP LOGIC
// ===================================

// ===================================
// STATE MANAGEMENT
// ===================================

let tasks = [];
let categories = [];
let currentView = 'today';
let currentMonth = new Date();
let editingTaskId = null;
let editingCategoryId = null;

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    loadFromLocalStorage();
    initializeDefaultCategories();
    setupEventListeners();
    applyTheme();
    renderCurrentView();
    setTodayAsDefault();
}

function setTodayAsDefault() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('taskDate').value = today;
}

// ===================================
// DEFAULT CATEGORIES
// ===================================

function initializeDefaultCategories() {
    if (categories.length === 0) {
        categories = [
            { id: generateId(), name: 'Casa & Limpeza', emoji: '🏠', color: '#f59e0b' },
            { id: generateId(), name: 'Pets', emoji: '🐕', color: '#10b981' },
            { id: generateId(), name: 'Cuidados Pessoais', emoji: '💅', color: '#ec4899' },
            { id: generateId(), name: 'Outras', emoji: '📝', color: '#6366f1' }
        ];
        saveToLocalStorage();
    }
}

// ===================================
// LOCAL STORAGE
// ===================================

function loadFromLocalStorage() {
    const savedTasks = localStorage.getItem('raissa_tasks');
    const savedCategories = localStorage.getItem('raissa_categories');

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }

    if (savedCategories) {
        categories = JSON.parse(savedCategories);
    }
}

function saveToLocalStorage() {
    localStorage.setItem('raissa_tasks', JSON.stringify(tasks));
    localStorage.setItem('raissa_categories', JSON.stringify(categories));
}

// ===================================
// EVENT LISTENERS
// ===================================

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => switchView(tab.dataset.view));
    });

    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);

    // Task modal
    document.getElementById('addTaskBtn').addEventListener('click', () => openTaskModal());
    document.getElementById('closeTaskModal').addEventListener('click', closeTaskModal);
    document.getElementById('cancelTaskBtn').addEventListener('click', closeTaskModal);
    document.getElementById('saveTaskBtn').addEventListener('click', saveTask);

    // Category modal
    document.getElementById('addCategoryBtn').addEventListener('click', () => openCategoryModal());
    document.getElementById('closeCategoryModal').addEventListener('click', closeCategoryModal);
    document.getElementById('cancelCategoryBtn').addEventListener('click', closeCategoryModal);
    document.getElementById('saveCategoryBtn').addEventListener('click', saveCategory);

    // Month navigation
    document.getElementById('prevMonth').addEventListener('click', () => changeMonth(-1));
    document.getElementById('nextMonth').addEventListener('click', () => changeMonth(1));

    // Close modal on backdrop click
    document.getElementById('taskModal').addEventListener('click', (e) => {
        if (e.target.id === 'taskModal') closeTaskModal();
    });
    document.getElementById('categoryModal').addEventListener('click', (e) => {
        if (e.target.id === 'categoryModal') closeCategoryModal();
    });
}

// ===================================
// VIEW SWITCHING
// ===================================

function switchView(viewName) {
    currentView = viewName;

    // Update tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.view === viewName);
    });

    // Update views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });

    document.getElementById(viewName + 'View').classList.add('active');

    renderCurrentView();
}

function renderCurrentView() {
    switch (currentView) {
        case 'today':
            renderTodayView();
            break;
        case 'week':
            renderWeekView();
            break;
        case 'month':
            renderMonthView();
            break;
        case 'categories':
            renderCategoriesView();
            break;
    }
}

// ===================================
// TODAY VIEW
// ===================================

function renderTodayView() {
    const today = new Date().toISOString().split('T')[0];
    const todayTasks = getTasksForDate(today);

    const taskList = document.getElementById('todayTaskList');
    const emptyState = document.getElementById('todayEmptyState');

    if (todayTasks.length === 0) {
        taskList.innerHTML = '';
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
        taskList.innerHTML = todayTasks.map(task => renderTaskItem(task)).join('');
    }

    updateTodayProgress(todayTasks);
}

function updateTodayProgress(todayTasks) {
    const completed = todayTasks.filter(t => t.completed).length;
    const total = todayTasks.length;
    const percentage = total > 0 ? (completed / total) * 100 : 0;

    document.getElementById('todayProgress').textContent = `${completed} de ${total} concluídas`;
    document.getElementById('todayProgressBar').style.width = `${percentage}%`;
}

function renderTaskItem(task) {
    const category = categories.find(c => c.id === task.categoryId);
    const recurrenceText = getRecurrenceText(task.recurrence);

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
            ${recurrenceText ? `<span class="task-recurrence">🔄 ${recurrenceText}</span>` : ''}
          </div>
          <div class="task-actions">
            <button class="btn-icon" onclick="editTask('${task.id}')" title="Editar">✏️</button>
            <button class="btn-icon delete" onclick="deleteTask('${task.id}')" title="Excluir">🗑️</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ===================================
// WEEK VIEW
// ===================================

function renderWeekView() {
    const weekGrid = document.getElementById('weekGrid');
    const today = new Date();
    const weekDays = [];

    // Get current week (Sunday to Saturday)
    const dayOfWeek = today.getDay();
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - dayOfWeek);

    for (let i = 0; i < 7; i++) {
        const day = new Date(sunday);
        day.setDate(sunday.getDate() + i);
        weekDays.push(day);
    }

    weekGrid.innerHTML = weekDays.map(day => renderDayCard(day)).join('');
}

function renderDayCard(date) {
    const dateStr = date.toISOString().split('T')[0];
    const dayTasks = getTasksForDate(dateStr);
    const isToday = dateStr === new Date().toISOString().split('T')[0];

    const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const dayName = dayNames[date.getDay()];
    const dayNumber = date.getDate();

    return `
    <div class="day-card ${isToday ? 'today' : ''}">
      <div class="day-header">
        ${dayName}
        <div class="day-date">${dayNumber}</div>
      </div>
      <div class="day-tasks">
        ${dayTasks.length === 0 ? '<p style="color: var(--text-muted); font-size: var(--font-size-xs);">Sem tarefas</p>' : ''}
        ${dayTasks.slice(0, 3).map(task => {
        const category = categories.find(c => c.id === task.categoryId);
        return `
            <div class="day-task-item" style="border-left-color: ${category?.color || '#a855f7'}">
              ${task.completed ? '✓ ' : ''}${escapeHtml(task.title)}
            </div>
          `;
    }).join('')}
        ${dayTasks.length > 3 ? `<p style="color: var(--text-muted); font-size: var(--font-size-xs); margin-top: var(--spacing-xs);">+${dayTasks.length - 3} mais</p>` : ''}
      </div>
    </div>
  `;
}

// ===================================
// MONTH VIEW
// ===================================

function renderMonthView() {
    const monthGrid = document.getElementById('monthGrid');
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // Update title
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    document.getElementById('monthTitle').textContent = `${monthNames[month]} ${year}`;

    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    let html = '';

    // Day headers
    const dayHeaders = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    dayHeaders.forEach(day => {
        html += `<div style="font-weight: 700; text-align: center; padding: var(--spacing-sm); color: var(--text-secondary);">${day}</div>`;
    });

    // Empty cells before first day
    for (let i = 0; i < startingDayOfWeek; i++) {
        html += '<div></div>';
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateStr = date.toISOString().split('T')[0];
        const dayTasks = getTasksForDate(dateStr);
        const isToday = dateStr === new Date().toISOString().split('T')[0];

        html += `
      <div class="day-card ${isToday ? 'today' : ''}" style="min-height: 80px;">
        <div class="day-header" style="font-size: var(--font-size-lg);">${day}</div>
        ${dayTasks.length > 0 ? `
          <div style="margin-top: var(--spacing-xs);">
            ${dayTasks.slice(0, 2).map(task => {
            const category = categories.find(c => c.id === task.categoryId);
            return `<div style="font-size: var(--font-size-xs); padding: 2px; background: ${category?.color || '#a855f7'}22; border-radius: var(--radius-sm); margin-bottom: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${task.completed ? '✓' : '•'} ${escapeHtml(task.title)}</div>`;
        }).join('')}
            ${dayTasks.length > 2 ? `<div style="font-size: var(--font-size-xs); color: var(--text-muted);">+${dayTasks.length - 2}</div>` : ''}
          </div>
        ` : ''}
      </div>
    `;
    }

    monthGrid.innerHTML = html;
}

function changeMonth(delta) {
    currentMonth.setMonth(currentMonth.getMonth() + delta);
    renderMonthView();
}

// ===================================
// CATEGORIES VIEW
// ===================================

function renderCategoriesView() {
    const categoriesList = document.getElementById('categoriesList');

    categoriesList.innerHTML = categories.map(category => {
        const taskCount = tasks.filter(t => t.categoryId === category.id).length;

        return `
      <div class="task-item" style="border-left-color: ${category.color}">
        <div class="task-header">
          <div style="font-size: 2rem;">${category.emoji}</div>
          <div class="task-content">
            <div class="task-title">${escapeHtml(category.name)}</div>
            <p style="color: var(--text-secondary); font-size: var(--font-size-sm);">
              ${taskCount} tarefa${taskCount !== 1 ? 's' : ''}
            </p>
            <div class="task-actions">
              <button class="btn-icon" onclick="editCategory('${category.id}')" title="Editar">✏️</button>
              <button class="btn-icon delete" onclick="deleteCategory('${category.id}')" title="Excluir">🗑️</button>
            </div>
          </div>
        </div>
      </div>
    `;
    }).join('');
}

// ===================================
// TASK MODAL
// ===================================

function openTaskModal(taskId = null) {
    editingTaskId = taskId;
    const modal = document.getElementById('taskModal');
    const title = document.getElementById('taskModalTitle');

    if (taskId) {
        const task = tasks.find(t => t.id === taskId);
        title.textContent = 'Editar Tarefa';
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskDescription').value = task.description || '';
        document.getElementById('taskDate').value = task.date;
        document.getElementById('taskRecurrence').value = task.recurrence;
    } else {
        title.textContent = 'Nova Tarefa';
        document.getElementById('taskForm').reset();
        setTodayAsDefault();
    }

    renderCategorySelector();
    modal.classList.add('active');
}

function closeTaskModal() {
    document.getElementById('taskModal').classList.remove('active');
    editingTaskId = null;
}

function renderCategorySelector() {
    const selector = document.getElementById('categorySelector');
    const selectedCategoryId = editingTaskId ? tasks.find(t => t.id === editingTaskId)?.categoryId : null;

    selector.innerHTML = categories.map(category => `
    <div class="category-option ${selectedCategoryId === category.id ? 'selected' : ''}" 
         data-category-id="${category.id}"
         onclick="selectCategory('${category.id}')"
         style="border-color: ${category.color}">
      <div style="font-size: 1.5rem; margin-bottom: var(--spacing-xs);">${category.emoji}</div>
      <div style="font-size: var(--font-size-sm);">${escapeHtml(category.name)}</div>
    </div>
  `).join('');
}

function selectCategory(categoryId) {
    document.querySelectorAll('.category-option').forEach(option => {
        option.classList.toggle('selected', option.dataset.categoryId === categoryId);
    });
}

function saveTask() {
    const title = document.getElementById('taskTitle').value.trim();
    const description = document.getElementById('taskDescription').value.trim();
    const date = document.getElementById('taskDate').value;
    const recurrence = document.getElementById('taskRecurrence').value;
    const selectedCategory = document.querySelector('.category-option.selected');

    if (!title || !date || !selectedCategory) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }

    const taskData = {
        title,
        description,
        date,
        recurrence,
        categoryId: selectedCategory.dataset.categoryId,
        completed: false
    };

    if (editingTaskId) {
        // Update existing task
        const taskIndex = tasks.findIndex(t => t.id === editingTaskId);
        tasks[taskIndex] = { ...tasks[taskIndex], ...taskData };
    } else {
        // Create new task
        tasks.push({
            id: generateId(),
            ...taskData,
            createdAt: new Date().toISOString()
        });
    }

    saveToLocalStorage();
    closeTaskModal();
    renderCurrentView();
}

// ===================================
// CATEGORY MODAL
// ===================================

function openCategoryModal(categoryId = null) {
    editingCategoryId = categoryId;
    const modal = document.getElementById('categoryModal');
    const title = document.getElementById('categoryModalTitle');

    if (categoryId) {
        const category = categories.find(c => c.id === categoryId);
        title.textContent = 'Editar Categoria';
        document.getElementById('categoryName').value = category.name;
        document.getElementById('categoryEmoji').value = category.emoji;
        document.getElementById('categoryColor').value = category.color;
    } else {
        title.textContent = 'Nova Categoria';
        document.getElementById('categoryForm').reset();
        document.getElementById('categoryColor').value = '#a855f7';
    }

    modal.classList.add('active');
}

function closeCategoryModal() {
    document.getElementById('categoryModal').classList.remove('active');
    editingCategoryId = null;
}

function saveCategory() {
    const name = document.getElementById('categoryName').value.trim();
    const emoji = document.getElementById('categoryEmoji').value.trim();
    const color = document.getElementById('categoryColor').value;

    if (!name || !emoji) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    const categoryData = { name, emoji, color };

    if (editingCategoryId) {
        const categoryIndex = categories.findIndex(c => c.id === editingCategoryId);
        categories[categoryIndex] = { ...categories[categoryIndex], ...categoryData };
    } else {
        categories.push({
            id: generateId(),
            ...categoryData
        });
    }

    saveToLocalStorage();
    closeCategoryModal();
    renderCurrentView();
}

// ===================================
// TASK ACTIONS
// ===================================

function toggleTaskComplete(taskId) {
    const task = tasks.find(t => t.id === taskId);
    task.completed = !task.completed;
    saveToLocalStorage();
    renderCurrentView();
}

function editTask(taskId) {
    openTaskModal(taskId);
}

function deleteTask(taskId) {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        tasks = tasks.filter(t => t.id !== taskId);
        saveToLocalStorage();
        renderCurrentView();
    }
}

function editCategory(categoryId) {
    openCategoryModal(categoryId);
}

function deleteCategory(categoryId) {
    const tasksWithCategory = tasks.filter(t => t.categoryId === categoryId).length;

    if (tasksWithCategory > 0) {
        alert(`Não é possível excluir esta categoria pois existem ${tasksWithCategory} tarefa(s) associadas.`);
        return;
    }

    if (confirm('Tem certeza que deseja excluir esta categoria?')) {
        categories = categories.filter(c => c.id !== categoryId);
        saveToLocalStorage();
        renderCurrentView();
    }
}

// ===================================
// THEME
// ===================================

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('raissa_theme', newTheme);

    const toggle = document.getElementById('themeToggle');
    toggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
}

function applyTheme() {
    const savedTheme = localStorage.getItem('raissa_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const toggle = document.getElementById('themeToggle');
    toggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function getTasksForDate(dateStr) {
    return tasks.filter(task => {
        if (task.date === dateStr) return true;

        // Handle recurring tasks
        if (task.recurrence !== 'none') {
            const taskDate = new Date(task.date);
            const checkDate = new Date(dateStr);

            if (checkDate < taskDate) return false;

            const daysDiff = Math.floor((checkDate - taskDate) / (1000 * 60 * 60 * 24));

            switch (task.recurrence) {
                case 'daily':
                    return true;
                case 'weekly':
                    return daysDiff % 7 === 0;
                case 'monthly':
                    return taskDate.getDate() === checkDate.getDate();
            }
        }

        return false;
    });
}

function getRecurrenceText(recurrence) {
    const texts = {
        'none': '',
        'daily': 'Diária',
        'weekly': 'Semanal',
        'monthly': 'Mensal'
    };
    return texts[recurrence] || '';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
