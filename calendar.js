// ===================================
// CALENDAR EXPORT FUNCTIONALITY
// ===================================

/**
 * Generate an .ics file for a task
 * @param {Object} task - Task object
 * @returns {string} - ICS file content
 */
function generateICS(task) {
    const category = categories.find(c => c.id === task.categoryId);
    const categoryName = category ? category.name : 'Tarefa';

    // Parse date and time
    const taskDate = new Date(task.date);
    if (task.time) {
        const [hours, minutes] = task.time.split(':');
        taskDate.setHours(parseInt(hours), parseInt(minutes));
    }

    // End time (1 hour after start)
    const endDate = new Date(taskDate);
    endDate.setHours(endDate.getHours() + 1);

    // Format dates for ICS (YYYYMMDDTHHMMSS)
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}${month}${day}T${hours}${minutes}00`;
    };

    const dtstart = formatDate(taskDate);
    const dtend = formatDate(endDate);
    const dtstamp = formatDate(new Date());

    // Build ICS content
    let ics = 'BEGIN:VCALENDAR\n';
    ics += 'VERSION:2.0\n';
    ics += 'PRODID:-//Organizer da Raíssa//PT\n';
    ics += 'CALSCALE:GREGORIAN\n';
    ics += 'BEGIN:VEVENT\n';
    ics += `UID:${task.id}@organizerraissa\n`;
    ics += `DTSTAMP:${dtstamp}\n`;
    ics += `DTSTART:${dtstart}\n`;
    ics += `DTEND:${dtend}\n`;
    ics += `SUMMARY:${escapeICS(task.title)}\n`;

    if (task.description) {
        ics += `DESCRIPTION:${escapeICS(task.description)}\n`;
    }

    ics += `CATEGORIES:${escapeICS(categoryName)}\n`;

    // Add alarm/reminder if configured
    if (task.reminder && task.reminder !== 'none') {
        const reminderMinutes = parseInt(task.reminder);
        ics += 'BEGIN:VALARM\n';
        ics += 'ACTION:DISPLAY\n';
        ics += `DESCRIPTION:Lembrete: ${escapeICS(task.title)}\n`;
        ics += `TRIGGER:-PT${reminderMinutes}M\n`;
        ics += 'END:VALARM\n';
    }

    ics += 'END:VEVENT\n';
    ics += 'END:VCALENDAR\n';

    return ics;
}

/**
 * Escape special characters for ICS format
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text
 */
function escapeICS(text) {
    return text
        .replace(/\\/g, '\\\\')
        .replace(/;/g, '\\;')
        .replace(/,/g, '\\,')
        .replace(/\n/g, '\\n');
}

/**
 * Download ICS file
 * @param {Object} task - Task object
 */
function downloadICS(task) {
    const icsContent = generateICS(task);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${task.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Add task to calendar (triggers download)
 * @param {string} taskId - Task ID
 */
function addToCalendar(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
        alert('Tarefa não encontrada!');
        return;
    }

    if (!task.time) {
        alert('Esta tarefa não tem horário definido. Adicione um horário para exportar ao calendário.');
        return;
    }

    downloadICS(task);
}
