const universityCount = 3;
let currentSortMethod = 'category';
let criteria = JSON.parse(JSON.stringify(defaultCriteria));
let universities = [];

function initializeUniversities() {
    universities = [];
    for (let i = 0; i < universityCount; i++) {
        universities.push({
            id: i + 1,
            name: `University ${String.fromCharCode(65 + i)}`,
            scores: {},
            totalScore: 0
        });
    }
}

function initializePage() {
    initializeUniversities();
    renderUniversityHeaders();
    sortCriteria();
    renderCriteria();
    updateTotalWeight();
    calculateAllScores();
    syncHeaderScroll();
}

function renderUniversityHeaders() {
    const container = document.getElementById('universityHeaders');
    container.innerHTML = '';
    
    universities.forEach((uni, index) => {
        const header = document.createElement('div');
        header.className = 'university-header-cell';
        header.style.width= '33%';
        header.innerHTML = `
            <input type="text" 
                    class="university-name-input mb-2" 
                    style="width: 100%;"
                    value="${uni.name}" 
                    data-university="${uni.id}"
                    placeholder="University Name">
            <div class="total-score" id="score-${uni.id}">0</div>
        `;
        container.appendChild(header);
    });
    
    document.querySelectorAll('.university-name-input').forEach(input => {
        input.addEventListener('input', function() {
            const uniId = parseInt(this.getAttribute('data-university'));
            const uni = universities.find(u => u.id === uniId);
            if (uni) {
                uni.name = this.value;
            }
        });
    });
}

function sortCriteria() {
    if (currentSortMethod === 'weight') {
        criteria.sort((a, b) => {
            if (b.weight !== a.weight) {
                return b.weight - a.weight;
            }
            if (categoryMap[a.category].order !== categoryMap[b.category].order) {
                return categoryMap[a.category].order - categoryMap[b.category].order;
            }
            return a.name.localeCompare(b.name);
        });
    } else if (currentSortMethod === 'category') {
        criteria.sort((a, b) => {
            if (categoryMap[a.category].order !== categoryMap[b.category].order) {
                return categoryMap[a.category].order - categoryMap[b.category].order;
            }
            if (b.weight !== a.weight) {
                return b.weight - a.weight;
            }
            return a.name.localeCompare(b.name);
        });
    }
}

function renderCriteria() {
    const container = document.getElementById('criteriaContainer');
    container.innerHTML = '';
    criteria.forEach(criterion => {
        const row = document.createElement('div');
        row.className = 'criteria-row';
        row.id = `criteria-${criterion.id}`;
        const criteriaCol = document.createElement('div');
        criteriaCol.className = 'criteria-cell';
        criteriaCol.style.width = '40%';
        criteriaCol.innerHTML = `
            <div class="criteria-content">
                <div class="type-weight-container">
                    <div>
                        <span class="type-label">Type:</span>
                        <span class="category-badge ${categoryMap[criterion.category].class}">
                            ${categoryMap[criterion.category].name}
                        </span>
                    </div>
                    <div>
                        <span class="type-label">Weight:</span>
                        <select class="weightage-select" data-criteria="${criterion.id}">
                            ${Array.from({length: 16}, (_, i) => 
                                `<option value="${i}" ${criterion.weight === i ? 'selected' : ''}>${i}</option>`
                            ).join('')}
                        </select>
                    </div>
                </div>
                <div class="criteria-label">${criterion.name}</div>
                <div class="criteria-description">${criterion.description}</div>
            </div>
        `;
        row.appendChild(criteriaCol);
        
        universities.forEach(uni => {
            const selectId = `select-${criterion.id}-${uni.id}`;
            const uniCol = document.createElement('div');
            uniCol.className = 'criteria-cell university-cell';
            uniCol.style.width = '20%';
            const currentValue = uni.scores[criterion.id] !== undefined ? uni.scores[criterion.id] : '-1';
            uniCol.innerHTML = `
                <select class="select-box" style="width: 100%;" id="${selectId}" data-criteria="${criterion.id}" data-university="${uni.id}">
                    <option value="">Select...</option>
                    ${criterion.options.map(opt => 
                        `<option value="${opt.value}" ${currentValue == opt.value ? 'selected' : ''}>${opt.label}</option>`
                    ).join('')}
                </select>
            `;
            row.appendChild(uniCol);
        });
        container.appendChild(row);
        const weightSelect = criteriaCol.querySelector(`select.weightage-select[data-criteria="${criterion.id}"]`);
        weightSelect.addEventListener('change', function() {
            updateCriteriaWeight(criterion.id, parseInt(this.value));
        });
        const selectElements = row.querySelectorAll(`select[data-criteria="${criterion.id}"]`);
        selectElements.forEach(select => {
            select.addEventListener('change', function() {
                const criteriaId = parseInt(this.getAttribute('data-criteria'));
                const uniId = parseInt(this.getAttribute('data-university'));
                const value = this.value === "" ? 0 : parseInt(this.value);
                updateUniversityScore(criteriaId, uniId, value);
            });
        });
    });
}

function updateCriteriaWeight(criteriaId, newWeight) {
    const criterion = criteria.find(c => c.id === criteriaId);
    if (criterion) {
        criterion.weight = newWeight;
        updateTotalWeight();
        sortCriteria();
        renderCriteria();
    }
}

function updateUniversityScore(criteriaId, uniId, selectedValue) {
    const uni = universities.find(u => u.id === uniId);
    const criterion = criteria.find(c => c.id === criteriaId);
    if (uni && criterion) {
        uni.scores[criteriaId] = selectedValue;
        calculateUniversityTotalScore(uni);
    }
}

function calculateUniversityTotalScore(university) {
    let total = 0;
    criteria.forEach(criterion => {
        const score = university.scores[criterion.id] || 0;
        const weightedScore = score * (criterion.weight / 10);
        total += weightedScore;
    });
    
    university.totalScore = Math.round(total);
    updateUniversityScoreDisplay(university.id);
}

function calculateAllScores() {
    universities.forEach(uni => {
        calculateUniversityTotalScore(uni);
    });
}

function updateUniversityScoreDisplay(uniId) {
    const uni = universities.find(u => u.id === uniId);
    if (uni) {
        const scoreElement = document.getElementById(`score-${uniId}`);
        if (scoreElement) {
            scoreElement.textContent = uni.totalScore;
            const percentage = (uni.totalScore / 100) * 100;
            if (percentage >= 75) {
                scoreElement.style.color = 'var(--success-color)';
            } else if (percentage >= 50) {
                scoreElement.style.color = 'var(--warning-color)';
            } else {
                scoreElement.style.color = 'var(--danger-color)';
            }
        }
    }
}

function updateTotalWeight() {
    const totalWeight = criteria.reduce((sum, criterion) => sum + criterion.weight, 0);
    const totalWeightElement = document.getElementById('totalWeight');
    totalWeightElement.textContent = totalWeight;
    if (totalWeight === 100) {
        totalWeightElement.className = 'total-weight-value total-weight-100';
    } else {
        totalWeightElement.className = 'total-weight-value total-weight-not-100';
    }
}

function syncHeaderScroll() {
    const scrollContainer = document.querySelector('.table-scroll-container');
    const headerContainer = document.querySelector('.table-header-container');
    if (scrollContainer && headerContainer) {
        scrollContainer.addEventListener('scroll', function() {
            headerContainer.scrollLeft = this.scrollLeft;
        });
    }
}

function exportToHTML() {
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>University Comparison Report</title>
        <style>
            th { background-color: #f8f9fa; color: #2c3e50; padding: 5px; text-align: center; border: 1px solid #ddd; }
            td { padding: 5px; border: 1px solid #ddd; }
        </style>
    </head>
    <body style="font-family: Arial, sans-serif; margin: 10px;">
        <h1 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px;">University Comparison Report</h1>
        <div style="color: #666; margin-bottom: 20px;">
            Generated on: ${new Date().toLocaleString()}
        </div>
        <table style="width: 100%; border-collapse: collapse; margin: 5px 0;">
            <thead>
                <tr>
                    <th style="text-align: left; width:40%">Compared Values: ${criteria.length}<br>Total Score: ${criteria.reduce((sum, c) => sum + c.weight, 0)}</th>
                    ${universities.map(uni => `<th style="width:20%">${uni.name}<br><i>Score: ${uni.totalScore}</i></th>`).join('')}
                </tr>
            </thead>
            <tbody>
                ${criteria.map(crit => `
                <tr style="height: 60px;">
                    <td><strong>${crit.name}</strong><br><small>${crit.description}</small></td>
                    ${universities.map(uni => exportedTableCell(uni,crit)).join('')}
                </tr>
                `).join('')}
            </tbody>
        </table>
    </body>
    </html>`;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `University_Comparison_${new Date().getTime()}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function exportedTableCell(uni,crit){
    const score = uni.scores[crit.id] !== undefined ? uni.scores[crit.id] : -1;
    if( score>-1 ){
        const option = crit.options.find(opt => opt.value == score);
        if(option){
            const percentage = score / 10;
            let red, green;
            if (percentage <= 0.5) {
                red = 255;
                green = Math.floor(255 * (percentage * 2));
            } else {
                red = Math.floor(255 * (2 - percentage * 2));
                green = 128 + Math.floor(127 * (percentage * 2 - 1));
            }
            const backgroundColor = `rgb(${red}, ${green}, 0)`;
            const brightness = (red * 299 + green * 587 + 0 * 114) / 1000;
            const textColor = brightness > 128 ? '#000000' : '#ffffff';
            return `<td style="padding: 5px; border-radius: 4px; text-align: center; background-color: ${backgroundColor}; color: ${textColor};">${option.label}</td>`;
        }
    }
    return '<td style="padding: 8px; border-radius: 4px;"></td>';
}