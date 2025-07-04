// rapport.js - Système de génération de rapport PDF pour PSTQ

function generateReport() {
    // Récupérer toutes les données
    const hasSpouse = document.getElementById('hasSpouse').checked;
    const totalScore = parseInt(document.getElementById('totalScore').textContent);
    const humanCapitalScore = parseInt(document.getElementById('humanCapitalScore').textContent);
    const quebecNeedsScore = parseInt(document.getElementById('quebecNeedsScore').textContent);
    const adaptationScore = parseInt(document.getElementById('adaptationScore').textContent);
    
    // Récupérer les détails des scores
    const humanCapitalDetails = extractScoreDetails('humanCapitalDetails');
    const quebecNeedsDetails = extractScoreDetails('quebecNeedsDetails');
    const adaptationDetails = extractScoreDetails('adaptationDetails');
    
    // Récupérer les valeurs du formulaire
    const formData = {
        // Français
        frenchOralComp: parseInt(document.getElementById('frenchOralComp').value),
        frenchOralProd: parseInt(document.getElementById('frenchOralProd').value),
        frenchWrittenComp: parseInt(document.getElementById('frenchWrittenComp').value),
        frenchWrittenProd: parseInt(document.getElementById('frenchWrittenProd').value),
        
        // Informations personnelles
        age: parseInt(document.getElementById('age').value),
        workExperience: parseInt(document.getElementById('workExperience').value),
        education: document.getElementById('education').options[document.getElementById('education').selectedIndex].text,
        
        // Besoins du Québec
        professionDiag: document.getElementById('professionDiag').options[document.getElementById('professionDiag').selectedIndex].text,
        professionExp: parseInt(document.getElementById('professionExp').value),
        quebecDiploma: document.getElementById('quebecDiploma').options[document.getElementById('quebecDiploma').selectedIndex].text,
        quebecWorkExp: parseInt(document.getElementById('quebecWorkExp').value),
        
        // Autres données...
        hasSpouse: hasSpouse,
        date: new Date().toLocaleDateString('fr-CA')
    };

    // Ouvrir une nouvelle fenêtre pour l'impression
    const printWindow = window.open('', '_blank');
    
    // Générer le HTML du rapport
    const reportHTML = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Rapport PSTQ - ${formData.date}</title>
    <style>
        @media print {
            body { margin: 0; }
            .no-print { display: none; }
            .page-break { page-break-after: always; }
        }
        
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            text-align: center;
            border-bottom: 3px solid #003f8a;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        
        .header h1 {
            color: #003f8a;
            margin: 0 0 10px 0;
        }
        
        .header p {
            color: #666;
            margin: 5px 0;
        }
        
        .score-summary {
            background: #f8f9fa;
            border: 2px solid #003f8a;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 30px;
            text-align: center;
        }
        
        .total-score {
            font-size: 48px;
            color: #003f8a;
            font-weight: bold;
            margin: 10px 0;
        }
        
        .score-category {
            display: flex;
            justify-content: space-around;
            margin-top: 20px;
        }
        
        .score-item {
            text-align: center;
        }
        
        .score-item h3 {
            color: #005cb8;
            margin-bottom: 5px;
        }
        
        .score-item .score {
            font-size: 28px;
            font-weight: bold;
            color: #333;
        }
        
        .section {
            margin-bottom: 30px;
        }
        
        .section h2 {
            color: #003f8a;
            border-bottom: 2px solid #e0e0e0;
            padding-bottom: 10px;
            margin-bottom: 15px;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }
        
        .info-item {
            padding: 10px;
            background: #f8f9fa;
            border-radius: 5px;
        }
        
        .info-label {
            font-weight: bold;
            color: #666;
            margin-bottom: 5px;
        }
        
        .info-value {
            color: #333;
            font-size: 16px;
        }
        
        .footer {
            margin-top: 50px;
            text-align: center;
            color: #666;
            font-size: 12px;
            border-top: 1px solid #e0e0e0;
            padding-top: 20px;
        }
        
        .recommendation {
            background: #e8f4f8;
            border-left: 4px solid #005cb8;
            padding: 15px;
            margin: 20px 0;
        }
        
        .print-button {
            background: #003f8a;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin: 20px auto;
            display: block;
        }
        
        .score-details {
            margin-top: 20px;
        }
        
        .score-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        
        .score-table th {
            background: #003f8a;
            color: white;
            padding: 10px;
            text-align: left;
        }
        
        .score-table td {
            padding: 8px;
            border-bottom: 1px solid #e0e0e0;
        }
        
        .score-table tr:nth-child(even) {
            background: #f8f9fa;
        }
        
        .points-cell {
            text-align: right;
            font-weight: bold;
            color: #003f8a;
        }
        
        .section-total {
            background: #e8f4f8;
            font-weight: bold;
        }
        
        @media print {
            .print-button { display: none; }
        }
    </style>
</head>
<body>
    <button class="print-button no-print" onclick="window.print()">📄 Imprimer le rapport</button>
    
    <div class="header">
        <h1>Rapport d'évaluation PSTQ</h1>
        <p>Programme de sélection des travailleurs qualifiés</p>
        <p>Date de l'évaluation : ${formData.date}</p>
    </div>
    
    <div class="score-summary">
        <h2>Résumé de votre évaluation</h2>
        <div class="total-score">${totalScore} / 1400</div>
        <p>Score total obtenu</p>
        
        <div class="score-category">
            <div class="score-item">
                <h3>Capital humain</h3>
                <div class="score">${humanCapitalScore}</div>
                <div>sur 520 points</div>
            </div>
            <div class="score-item">
                <h3>Besoins du Québec</h3>
                <div class="score">${quebecNeedsScore}</div>
                <div>sur 700 points</div>
            </div>
            <div class="score-item">
                <h3>Facteurs d'adaptation</h3>
                <div class="score">${adaptationScore}</div>
                <div>sur 180 points</div>
            </div>
        </div>
    </div>
    
    <div class="recommendation">
        <strong>Analyse de votre score :</strong><br>
        ${getScoreAnalysis(totalScore)}
    </div>
    
    <div class="section score-details">
        <h2>Détail des points obtenus</h2>
        
        <h3 style="color: #005cb8; margin-top: 20px;">Capital humain</h3>
        <table class="score-table">
            <thead>
                <tr>
                    <th>Critère</th>
                    <th style="text-align: right;">Points</th>
                </tr>
            </thead>
            <tbody>
                ${generateScoreRows(humanCapitalDetails)}
                <tr class="section-total">
                    <td>Total Capital humain</td>
                    <td class="points-cell">${humanCapitalScore} pts</td>
                </tr>
            </tbody>
        </table>
        
        <h3 style="color: #005cb8;">Besoins du Québec et priorités</h3>
        <table class="score-table">
            <thead>
                <tr>
                    <th>Critère</th>
                    <th style="text-align: right;">Points</th>
                </tr>
            </thead>
            <tbody>
                ${generateScoreRows(quebecNeedsDetails)}
                <tr class="section-total">
                    <td>Total Besoins du Québec</td>
                    <td class="points-cell">${quebecNeedsScore} pts</td>
                </tr>
            </tbody>
        </table>
        
        <h3 style="color: #005cb8;">Facteurs d'adaptation</h3>
        <table class="score-table">
            <thead>
                <tr>
                    <th>Critère</th>
                    <th style="text-align: right;">Points</th>
                </tr>
            </thead>
            <tbody>
                ${generateScoreRows(adaptationDetails)}
                <tr class="section-total">
                    <td>Total Facteurs d'adaptation</td>
                    <td class="points-cell">${adaptationScore} pts</td>
                </tr>
            </tbody>
        </table>
    </div>
    
    <div class="section">
        <h2>Détail de votre profil</h2>
        <div class="info-grid">
            <div class="info-item">
                <div class="info-label">Âge</div>
                <div class="info-value">${formData.age} ans</div>
            </div>
            <div class="info-item">
                <div class="info-label">Statut familial</div>
                <div class="info-value">${formData.hasSpouse ? 'Avec conjoint(e)' : 'Sans conjoint(e)'}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Niveau de français (moyenne)</div>
                <div class="info-value">Niveau ${Math.round((formData.frenchOralComp + formData.frenchOralProd + formData.frenchWrittenComp + formData.frenchWrittenProd) / 4)}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Expérience de travail</div>
                <div class="info-value">${formData.workExperience} mois</div>
            </div>
            <div class="info-item">
                <div class="info-label">Niveau d'études</div>
                <div class="info-value">${formData.education}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Diagnostic profession</div>
                <div class="info-value">${formData.professionDiag}</div>
            </div>
        </div>
    </div>
    
    <div class="section">
        <h2>Compétences linguistiques en français</h2>
        <div class="info-grid">
            <div class="info-item">
                <div class="info-label">Compréhension orale</div>
                <div class="info-value">Niveau ${formData.frenchOralComp}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Production orale</div>
                <div class="info-value">Niveau ${formData.frenchOralProd}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Compréhension écrite</div>
                <div class="info-value">Niveau ${formData.frenchWrittenComp}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Production écrite</div>
                <div class="info-value">Niveau ${formData.frenchWrittenProd}</div>
            </div>
        </div>
    </div>
    
    <div class="footer">
        <p>Rapport généré par l'Évaluateur PSTQ - https://pstq-score-similator.vercel.app/</p>
        <p>Ce rapport est basé sur les critères du 2 juillet 2025. Les seuils d'invitation varient selon les tirages.</p>
        <p>© 2025 - Développé par Moussa Touré</p>
    </div>
</body>
</html>
    `;
    
    // Écrire le HTML dans la nouvelle fenêtre
    printWindow.document.write(reportHTML);
    printWindow.document.close();
}

// Fonction pour extraire les détails des scores
function extractScoreDetails(elementId) {
    const details = [];
    const detailsElement = document.getElementById(elementId);
    
    if (detailsElement) {
        const detailLines = detailsElement.querySelectorAll('.detail-line');
        detailLines.forEach(line => {
            const label = line.querySelector('.detail-label').textContent;
            const points = line.querySelector('.detail-points').textContent;
            details.push({ label, points });
        });
    }
    
    return details;
}

// Fonction pour générer les lignes du tableau de scores
function generateScoreRows(details) {
    if (details.length === 0) {
        return '<tr><td colspan="2" style="text-align: center; color: #666;">Aucun point obtenu</td></tr>';
    }
    
    return details.map(detail => `
        <tr>
            <td>${detail.label}</td>
            <td class="points-cell">${detail.points}</td>
        </tr>
    `).join('');
}

// Fonction pour analyser le score et donner des recommandations
function getScoreAnalysis(score) {
    if (score >= 1200) {
        return "Excellent ! Votre score est très élevé. Vous avez d'excellentes chances d'être sélectionné lors des prochains tirages.";
    } else if (score >= 1000) {
        return "Très bon score ! Vous êtes bien positionné pour une invitation.";
    } else if (score >= 800) {
        return "Bon score. Vos chances sont correctes, mais améliorer votre niveau de français ou obtenir une expérience au Québec pourrait significativement augmenter vos chances.";
    } else if (score >= 600) {
        return "Score modéré. Considérez améliorer votre français et/ou acquérir de l'expérience dans une profession en demande.";
    } else {
        return "Score faible. Il est recommandé d'améliorer significativement votre français et d'acquérir plus d'expérience professionnelle avant de postuler.";
    }
}