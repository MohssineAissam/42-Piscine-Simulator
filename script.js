class PiscineSimulator {
    constructor() {
        this.currentLevel = 'beginner';
        this.currentDay = 0;
        this.exercisesSolved = 0;
        this.currentStreak = 0;
        this.totalAttempts = 0;
        this.successfulAttempts = 0;
        this.currentExercise = null;

        this.exercises = this.initializeExercises();
        this.initializeEventListeners();
        this.createFloatingParticles();
        this.updateStats();
    }

    initializeExercises() {
        return {
            beginner: [
                {
                    day: 0,
                    title: "ft_print_alphabet",
                    description: "Write a function that displays the alphabet in lowercase, on a single line, by ascending order, starting from the letter 'a'.",
                    difficulty: "easy",
                    hint: "Use a loop from 'a' to 'z' and putchar() to display each character.",
                    solution: "ft_putchar",
                    topic: "Basic Output"
                },
                {
                    day: 0,
                    title: "ft_print_numbers",
                    description: "Write a function that displays all digits, on a single line, by ascending order.",
                    difficulty: "easy",
                    hint: "Use a loop from '0' to '9' and putchar() to display each digit.",
                    solution: "ft_putchar",
                    topic: "Basic Output"
                },
                {
                    day: 1,
                    title: "ft_print_reverse_alphabet",
                    description: "Write a function that displays the alphabet in lowercase, on a single line, by descending order, starting from the letter 'z'.",
                    difficulty: "easy",
                    hint: "Use a loop from 'z' to 'a' and putchar() to display each character.",
                    solution: "ft_putchar",
                    topic: "Basic Output"
                },
                {
                    day: 2,
                    title: "ft_swap",
                    description: "Create a function that swaps the value of two integers whose addresses are passed as parameters.",
                    difficulty: "easy",
                    hint: "Use pointers and a temporary variable to swap the values.",
                    solution: "pointers",
                    topic: "Pointers"
                },
                {
                    day: 2,
                    title: "ft_strlen",
                    description: "Write a function that counts and returns the number of characters in a string.",
                    difficulty: "easy",
                    hint: "Loop through the string until you find the null terminator '\\0'.",
                    solution: "string_length",
                    topic: "Strings"
                },
                {
                    day: 3,
                    title: "ft_strcmp",
                    description: "Reproduce the behavior of the function strcmp. Compare two strings and return an integer less than, equal to, or greater than zero.",
                    difficulty: "medium",
                    hint: "Compare characters one by one until you find a difference or reach the end.",
                    solution: "string_comparison",
                    topic: "String Comparison"
                },
                {
                    day: 4,
                    title: "ft_fibonacci",
                    description: "Create a function that returns the n-th element of the Fibonacci sequence. (0, 1, 1, 2, 3, 5, 8, ...)",
                    difficulty: "medium",
                    hint: "You can solve this iteratively or recursively. For recursion: fib(n) = fib(n-1) + fib(n-2).",
                    solution: "fibonacci",
                    topic: "Recursion"
                }
            ],
            intermediate: [
              
                {
                    day: 5,
                    title: "ft_strdup",
                    description: "Reproduce the behavior of the function strdup. Allocate memory and return a copy of the string given as parameter.",
                    difficulty: "medium",
                    hint: "Use malloc to allocate memory, then copy each character. Don't forget to null-terminate!",
                    solution: "dynamic_allocation",
                    topic: "Memory Management"
                },
                {
                    day: 6,
                    title: "ft_print_program_name",
                    description: "Create a program that displays its own name followed by a newline.",
                    difficulty: "medium",
                    hint: "Use argv[0] to get the program name. Remember argc and argv parameters in main.",
                    solution: "command_line",
                    topic: "Command Line Arguments"
                },
                {
                    day: 7,
                    title: "ft_rev_int_tab",
                    description: "Create a function which reverses a given array of integers. The function takes as parameters the array and its size.",
                    difficulty: "medium",
                    hint: "Swap elements from the beginning and end, working towards the center.",
                    solution: "array_manipulation",
                    topic: "Arrays"
                },
                {
                    day: 8,
                    title: "ft_atoi",
                    description: "Write a function that converts the initial portion of the string pointed to by str to int representation.",
                    difficulty: "hard",
                    hint: "Handle whitespace, signs (+/-), and convert digit characters to their numeric values.",
                    solution: "string_to_int",
                    topic: "String Parsing"
                },
                {
                    day: 9,
                    title: "ft_split",
                    description: "Write a function that splits a string using a separator and returns an array of strings.",
                    difficulty: "hard",
                    hint: "Count the number of words first, allocate memory, then split and copy each word.",
                    solution: "string_splitting",
                    topic: "Dynamic Arrays"
                }
            ],
            advanced: [
                {
                    day: 10,
                    title: "ft_list_push_front",
                    description: "Create a function that adds a new element at the beginning of the list.",
                    difficulty: "hard",
                    hint: "Create a new node, set its data and next pointer, then update the list head.",
                    solution: "linked_lists",
                    topic: "Linked Lists"
                },
                {
                    day: 11,
                    title: "ft_list_size",
                    description: "Create a function that returns the number of elements in the linked list.",
                    difficulty: "hard",
                    hint: "Iterate through the list counting nodes until you reach NULL.",
                    solution: "linked_lists",
                    topic: "Linked Lists"
                },
                {
                    day: 12,
                    title: "ft_create_elem",
                    description: "Create a function that creates a new element for a linked list.",
                    difficulty: "hard",
                    hint: "Allocate memory for a new node, set its data, and initialize next to NULL.",
                    solution: "linked_lists",
                    topic: "Memory & Structures"
                },
                {
                    day: 13,
                    title: "btree_create_node",
                    description: "Create a function that allocates and returns a new element for a binary tree.",
                    difficulty: "hard",
                    hint: "Allocate memory for a tree node with data, left, and right pointers.",
                    solution: "binary_trees",
                    topic: "Binary Trees"
                }
            ]
        };
    }

    initializeEventListeners() {
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentLevel = e.target.dataset.level;
                this.resetProgress();
            });
        });

        document.getElementById('newExerciseBtn').addEventListener('click', () => this.generateNewExercise());
        document.getElementById('submitBtn').addEventListener('click', () => this.submitSolution());
        document.getElementById('hintBtn').addEventListener('click', () => this.showHint());
        document.getElementById('skipBtn').addEventListener('click', () => this.skipExercise());
    }

    resetProgress() {
        this.currentDay = this.currentLevel === 'beginner' ? 0 : this.currentLevel === 'intermediate' ? 5 : 10;
        this.exercisesSolved = 0;
        this.currentStreak = 0;
        this.totalAttempts = 0;
        this.successfulAttempts = 0;
        this.updateStats();
        this.hideResult();
        this.hideHint();
    }

    generateNewExercise() {
        const exercises = this.exercises[this.currentLevel];
        this.currentExercise = exercises[Math.floor(Math.random() * exercises.length)];

        const progressDay = Math.floor(this.exercisesSolved / 2);
        this.currentDay = (this.currentLevel === 'beginner' ? 0 : this.currentLevel === 'intermediate' ? 5 : 10) + progressDay;

        this.displayExercise();
        this.hideResult();
        this.hideHint();
        document.getElementById('codeInput').value = '';
        this.updateStats();
    }

    displayExercise() {
        if (!this.currentExercise) return;

        document.getElementById('exerciseTitle').textContent = this.currentExercise.title;
        document.getElementById('dayBadge').textContent = `Day ${this.currentDay}`;
        document.getElementById('difficultyBadge').textContent = this.currentExercise.difficulty;
        document.getElementById('difficultyBadge').className = `difficulty-badge ${this.currentExercise.difficulty}`;
        document.getElementById('exerciseDescription').innerHTML = `
                    <strong>Topic:</strong> ${this.currentExercise.topic}<br><br>
                    ${this.currentExercise.description}
                    <br><br>
                    <strong>Instructions:</strong><br>
                    • Write a complete C function or program<br>
                    • Follow 42 coding standards (no for loops in some exercises)<br>
                    • Handle edge cases appropriately<br>
                    • Your solution will be evaluated based on correctness and style
                `;
    }

    submitSolution() {
        if (!this.currentExercise) {
            this.showResult('Please generate a new exercise first!', false);
            return;
        }

        const code = document.getElementById('codeInput').value.trim();
        if (!code) {
            this.showResult('Please write your solution first!', false);
            return;
        }

        this.totalAttempts++;
        const isCorrect = this.evaluateSolution(code);

        if (isCorrect) {
            this.exercisesSolved++;
            this.successfulAttempts++;
            this.currentStreak++;
            this.showResult(`🎉 Excellent! Your solution is correct!\n\nYou've successfully completed: ${this.currentExercise.title}\nTopic: ${this.currentExercise.topic}`, true);
        } else {
            this.currentStreak = 0;
            this.showResult(`❌ Not quite right. Keep trying!\n\nCommon issues to check:\n• Function signature and return type\n• Edge cases handling\n• Memory management\n• Logic implementation\n\nTip: Use the hint button if you're stuck!`, false);
        }

        this.updateStats();
    }

    evaluateSolution(code) {  
        const exercise = this.currentExercise;

        if (!code.includes('#include') && !code.includes('stdio.h') && !code.includes('unistd.h')) {
            return Math.random() > 0.7; 
        }

      
        if (!code.includes(exercise.title)) {
            return Math.random() > 0.6;
        }

        const baseSuccessRate = {
            'easy': 0.8,
            'medium': 0.6,
            'hard': 0.4
        };

       
        const streakBonus = Math.min(this.currentStreak * 0.1, 0.3);
        const successRate = baseSuccessRate[exercise.difficulty] + streakBonus;

        return Math.random() < successRate;
    }

    showHint() {
        if (!this.currentExercise) return;

        document.getElementById('hintText').textContent = this.currentExercise.hint;
        document.getElementById('hintSection').classList.add('show');
    }

    hideHint() {
        document.getElementById('hintSection').classList.remove('show');
    }

    skipExercise() {
        if (!this.currentExercise) return;

        this.currentStreak = Math.max(0, this.currentStreak - 1);
        this.showResult(`⏭️ Exercise skipped: ${this.currentExercise.title}\n\nDon't worry, you can always come back to similar exercises later. Practice makes perfect!`, false);
        this.updateStats();
    }

    showResult(message, success) {
        const container = document.getElementById('resultContainer');
        container.textContent = message;
        container.className = `result-container ${success ? 'result-success' : 'result-error'}`;
        container.style.display = 'block';
    }

    hideResult() {
        document.getElementById('resultContainer').style.display = 'none';
    }

    updateStats() {
        document.getElementById('currentDay').textContent = `Day ${this.currentDay}`;
        document.getElementById('exercisesSolved').textContent = this.exercisesSolved;
        document.getElementById('currentStreak').textContent = this.currentStreak;

        const successRate = this.totalAttempts > 0 ? Math.round((this.successfulAttempts / this.totalAttempts) * 100) : 0;
        document.getElementById('successRate').textContent = `${successRate}%`;

    
        const maxDay = this.currentLevel === 'beginner' ? 4 : this.currentLevel === 'intermediate' ? 9 : 13;
        const minDay = this.currentLevel === 'beginner' ? 0 : this.currentLevel === 'intermediate' ? 5 : 10;
        const progress = ((this.currentDay - minDay) / (maxDay - minDay)) * 100;
        document.getElementById('progressFill').style.width = `${Math.min(progress, 100)}%`;
    }

    createFloatingParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (3 + Math.random() * 3) + 's';
            particlesContainer.appendChild(particle);
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new PiscineSimulator();
});


document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
            case 'Enter':
                e.preventDefault();
                document.getElementById('submitBtn').click();
                break;
            case 'n':
                e.preventDefault();
                document.getElementById('newExerciseBtn').click();
                break;
            case 'h':
                e.preventDefault();
                document.getElementById('hintBtn').click();
                break;
        }
    }
});

document.getElementById('codeInput').addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        e.preventDefault();
        const start = e.target.selectionStart;
        const end = e.target.selectionEnd;
        e.target.value = e.target.value.substring(0, start) + '\t' + e.target.value.substring(end);
        e.target.selectionStart = e.target.selectionEnd = start + 1;
    }


    const autoComplete = {
        '(': ')',
        '[': ']',
        '{': '}',
        '"': '"',
        "'": "'"
    };

    if (autoComplete[e.key]) {
        const start = e.target.selectionStart;
        const end = e.target.selectionEnd;

        if (start === end) {
            e.preventDefault();
            const before = e.target.value.substring(0, start);
            const after = e.target.value.substring(end);
            e.target.value = before + e.key + autoComplete[e.key] + after;
            e.target.selectionStart = e.target.selectionEnd = start + 1;
        }
    }
});

document.getElementById('codeInput').addEventListener('input', (e) => {
   
    const keywords = ['#include', 'int', 'char', 'void', 'return', 'if', 'else', 'while', 'for', 'printf', 'scanf'];

});


const motivationalMessages = [
    "🚀 Keep coding! Every expert was once a beginner.",
    "💪 You're getting stronger with each exercise!",
    "🎯 Focus and determination will get you there!",
    "⭐ Great progress! The 42 spirit is strong in you!",
    "🔥 On fire! Keep that momentum going!",
    "🧠 Your problem-solving skills are improving!",
    "⚡ Lightning fast progress! Keep it up!",
    "🏆 Champion mindset! Victory is within reach!"
];


setInterval(() => {
    if (Math.random() < 0.1) { 
        const message = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];

        
        const floatingMsg = document.createElement('div');
        floatingMsg.textContent = message;
        floatingMsg.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(45deg, #7c3aed, #1e40af);
                    color: white;
                    padding: 15px 20px;
                    border-radius: 10px;
                    font-weight: 600;
                    box-shadow: 0 10px 30px rgba(124, 58, 237, 0.3);
                    z-index: 1000;
                    animation: slideInRight 0.5s ease, fadeOut 0.5s ease 3s forwards;
                `;

        document.body.appendChild(floatingMsg);


        setTimeout(() => {
            if (floatingMsg.parentNode) {
                floatingMsg.parentNode.removeChild(floatingMsg);
            }
        }, 4000);
    }
}, 30000); 

const style = document.createElement('style');
style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes fadeOut {
                from {
                    opacity: 1;
                }
                to {
                    opacity: 0;
                    transform: translateX(100%);
                }
            }
        `;
document.head.appendChild(style);