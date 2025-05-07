// DOM Elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const tasksList = document.getElementById('tasks-list');
const taskCount = document.getElementById('task-count');
const loading = document.getElementById('loading');
const emptyState = document.getElementById('empty-state');
const taskTemplate = document.getElementById('task-template');
const editModal = document.getElementById('edit-modal');
const editForm = document.getElementById('edit-form');
const editInput = document.getElementById('edit-input');
const cancelEdit = document.getElementById('cancel-edit');

// API Base URL
const API_URL = '/api/v1/tasks';

// Current tasks array
let tasks = [];
// Currently editing task ID
let currentEditId = null;

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    fetchTasks();
    setupEventListeners();
});

// Set up event listeners
function setupEventListeners() {
    // Add new task
    taskForm.addEventListener('submit', addTask);
    
    // Task list delegated events (edit, delete, toggle)
    tasksList.addEventListener('click', handleTaskAction);
    
    // Edit modal events
    editForm.addEventListener('submit', saveTaskEdit);
    cancelEdit.addEventListener('click', closeEditModal);
}

// Fetch all tasks from API
async function fetchTasks() {
    showLoading(true);
    
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        
        const data = await response.json();
        tasks = data.task || [];
        
        renderTasks();
        updateTaskCount();
    } catch (error) {
        showToast('Error loading tasks. Please try again.', 'error');
        console.error('Error fetching tasks:', error);
    } finally {
        showLoading(false);
    }
}

// Add a new task
async function addTask(e) {
    e.preventDefault();
    
    const taskName = taskInput.value.trim();
    
    if (!taskName) return;
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: taskName })
        });
        
        if (!response.ok) {
            throw new Error('Failed to add task');
        }
        
        const data = await response.json();
        tasks.push(data.task);
        
        renderTasks();
        updateTaskCount();
        showToast('Task added successfully!', 'success');
        
        // Clear input
        taskInput.value = '';
    } catch (error) {
        showToast('Error adding task. Please try again.', 'error');
        console.error('Error adding task:', error);
    }
}

// Handle task actions (edit, delete, toggle)
function handleTaskAction(e) {
    const taskItem = e.target.closest('.task-item');
    
    if (!taskItem) return;
    
    const taskId = taskItem.dataset.id;
    
    // Edit button clicked
    if (e.target.closest('.edit-btn')) {
        openEditModal(taskId);
    }
    
    // Delete button clicked
    if (e.target.closest('.delete-btn')) {
        deleteTask(taskId);
    }
    
    // Checkbox clicked
    if (e.target.classList.contains('task-checkbox')) {
        toggleTaskStatus(taskId, e.target.checked);
    }
}

// Open edit modal
function openEditModal(taskId) {
    const task = tasks.find(t => t._id === taskId);
    
    if (!task) return;
    
    currentEditId = taskId;
    editInput.value = task.name;
    editModal.classList.add('active');
    editInput.focus();
}

// Close edit modal
function closeEditModal() {
    editModal.classList.remove('active');
    currentEditId = null;
}

// Save task edit
async function saveTaskEdit(e) {
    e.preventDefault();
    
    if (!currentEditId) return;
    
    const newName = editInput.value.trim();
    
    if (!newName) return;
    
    try {
        const response = await fetch(`${API_URL}/${currentEditId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newName })
        });
        
        if (!response.ok) {
            throw new Error('Failed to update task');
        }
        
        const data = await response.json();
        
        // Update task in array
        const index = tasks.findIndex(t => t._id === currentEditId);
        if (index !== -1) {
            tasks[index] = data.task;
        }
        
        renderTasks();
        closeEditModal();
        showToast('Task updated successfully!', 'success');
    } catch (error) {
        showToast('Error updating task. Please try again.', 'error');
        console.error('Error updating task:', error);
    }
}

// Toggle task status (complete/incomplete)
async function toggleTaskStatus(taskId, completed) {
    try {
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed })
        });
        
        if (!response.ok) {
            throw new Error('Failed to update task status');
        }
        
        const data = await response.json();
        
        // Update task in array
        const index = tasks.findIndex(t => t._id === taskId);
        if (index !== -1) {
            tasks[index] = data.task;
        }
        
        renderTasks();
        showToast(`Task marked as ${completed ? 'completed' : 'incomplete'}`, 'success');
    } catch (error) {
        showToast('Error updating task status. Please try again.', 'error');
        console.error('Error updating task status:', error);
        renderTasks(); // Re-render to reset checkbox
    }
}

// Delete a task
async function deleteTask(taskId) {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete task');
        }
        
        // Remove task from array
        tasks = tasks.filter(task => task._id !== taskId);
        
        renderTasks();
        updateTaskCount();
        showToast('Task deleted successfully!', 'success');
    } catch (error) {
        showToast('Error deleting task. Please try again.', 'error');
        console.error('Error deleting task:', error);
    }
}

// Render tasks to the DOM
function renderTasks() {
    // Clear current list
    tasksList.innerHTML = '';
    
    if (tasks.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }
    
    emptyState.classList.add('hidden');
    
    // Render each task
    tasks.forEach(task => {
        const taskElement = document.importNode(taskTemplate.content, true);
        const taskItem = taskElement.querySelector('.task-item');
        const taskText = taskElement.querySelector('.task-text');
        const taskCheckbox = taskElement.querySelector('.task-checkbox');
        
        taskItem.dataset.id = task._id;
        taskText.textContent = task.name;
        taskCheckbox.checked = task.completed;
        
        if (task.completed) {
            taskItem.classList.add('completed');
        }
        
        tasksList.appendChild(taskElement);
    });
}

// Update task count
function updateTaskCount() {
    const count = tasks.length;
    taskCount.textContent = `${count} task${count !== 1 ? 's' : ''}`;
}

// Show/hide loading spinner
function showLoading(show) {
    if (show) {
        loading.style.display = 'flex';
        tasksList.style.display = 'none';
        emptyState.classList.add('hidden');
    } else {
        loading.style.display = 'none';
        tasksList.style.display = 'block';
    }
}

// Show toast notification
function showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}