
        // Tableaux de pointage pour le français
        const frenchScores = {
            single: {
                oral: {
                    1: 0, 2: 0, 3: 0, 4: 0,
                    5: 38, 6: 38,
                    7: 44, 8: 44,
                    9: 50, 10: 50, 11: 50, 12: 50
                },
                written: {
                    1: 0, 2: 0, 3: 0, 4: 0,
                    5: 38, 6: 38,
                    7: 44, 8: 44,
                    9: 50, 10: 50, 11: 50, 12: 50
                }
            },
            withSpouse: {
                oral: {
                    1: 0, 2: 0, 3: 0, 4: 0,
                    5: 30, 6: 30,
                    7: 35, 8: 35,
                    9: 40, 10: 40, 11: 40, 12: 40
                },
                written: {
                    1: 0, 2: 0, 3: 0, 4: 0,
                    5: 30, 6: 30,
                    7: 35, 8: 35,
                    9: 40, 10: 40, 11: 40, 12: 40
                }
            }
        };

        // Tableaux de pointage pour l'âge
        const ageScores = {
            single: {
                18: 110, 19: 110,
                20: 120, 21: 120, 22: 120, 23: 120, 24: 120, 25: 120, 26: 120, 27: 120, 28: 120, 29: 120, 30: 120,
                31: 110, 32: 100, 33: 90, 34: 80, 35: 75, 36: 70, 37: 65, 38: 60, 39: 55, 40: 50,
                41: 40, 42: 30, 43: 20, 44: 10
            },
            withSpouse: {
                18: 90, 19: 90,
                20: 100, 21: 100, 22: 100, 23: 100, 24: 100, 25: 100, 26: 100, 27: 100, 28: 100, 29: 100, 30: 100,
                31: 95, 32: 90, 33: 81, 34: 72, 35: 68, 36: 63, 37: 59, 38: 54, 39: 50, 40: 45,
                41: 36, 42: 27, 43: 18, 44: 9
            }
        };

        // Tableaux pour l'expérience
        const experienceScores = {
            single: {
                0: 0, 12: 20, 24: 40, 36: 50, 48: 70
            },
            withSpouse: {
                0: 0, 12: 15, 24: 30, 36: 35, 48: 50
            }
        };

        // Tableaux pour le français du conjoint
        const spouseFrenchScores = {
            1: 0, 2: 0, 3: 0, 4: 4,
            5: 6, 6: 6,
            7: 8, 8: 8,
            9: 10, 10: 10, 11: 10, 12: 10
        };

        // Tableaux pour l'âge du conjoint
        const spouseAgeScores = {
            16: 18, 17: 18, 18: 18, 19: 18,
            20: 20, 21: 20, 22: 20, 23: 20, 24: 20, 25: 20, 26: 20, 27: 20, 28: 20, 29: 20, 30: 20,
            31: 18, 32: 17, 33: 16, 34: 15, 35: 14, 36: 12, 37: 10, 38: 8, 39: 7, 40: 6,
            41: 5, 42: 4, 43: 3, 44: 2
        };

        // Fonction pour calculer le score d'expérience
        function getExperienceScore(months, hasSpouse) {
            const scores = hasSpouse ? experienceScores.withSpouse : experienceScores.single;
            if (months < 12) return 0;
            if (months < 24) return scores[12];
            if (months < 36) return scores[24];
            if (months < 48) return scores[36];
            return scores[48];
        }

        // Fonction pour calculer le score de profession
        function getProfessionScore(diagnostic, months) {
            if (months < 12) return 0;

            const scores = {
                'equilibre': { 12: 5, 24: 10, 36: 15, 48: 25 },
                'leger_deficit': { 12: 70, 24: 80, 36: 90, 48: 100 },
                'deficit': { 12: 90, 24: 100, 36: 110, 48: 120 }
            };

            const diagScores = scores[diagnostic];
            if (months < 24) return diagScores[12];
            if (months < 36) return diagScores[24];
            if (months < 48) return diagScores[36];
            return diagScores[48];
        }

        // Fonction pour calculer le score d'expérience au Québec
        function getQuebecExperienceScore(months) {
            if (months < 12) return 0;
            if (months < 24) return 40;
            if (months < 36) return 80;
            if (months < 48) return 120;
            return 160;
        }

        // Fonctions pour les séjours hors CMM
        function getOutsideMtlResidenceScore(months) {
            if (months < 6) return 0;
            if (months < 12) return 6;
            if (months < 24) return 16;
            if (months < 36) return 24;
            if (months < 48) return 32;
            return 40;
        }

        function getOutsideMtlWorkScore(months) {
            if (months < 6) return 0;
            if (months < 12) return 9;
            if (months < 24) return 24;
            if (months < 36) return 36;
            if (months < 48) return 48;
            return 60;
        }

        function getOutsideMtlStudyScore(months) {
            if (months < 6) return 0;
            if (months < 12) return 3;
            if (months < 24) return 8;
            if (months < 36) return 12;
            if (months < 48) return 16;
            return 20;
        }

        // Fonction pour le séjour d'études
        function getStudyScore(status, months) {
            if (status === 'none') return 0;

            const scores = {
                'completed': { 0: 0, 6: 1, 12: 3, 24: 5, 36: 8, 48: 10 },
                'ongoing': { 0: 0, 6: 5, 12: 12, 24: 18, 36: 24, 48: 30 }
            };

            const statusScores = scores[status];
            if (months < 6) return 0;
            if (months < 12) return statusScores[6];
            if (months < 24) return statusScores[12];
            if (months < 36) return statusScores[24];
            if (months < 48) return statusScores[36];
            return statusScores[48];
        }

        // Fonction pour l'expérience du conjoint au Québec
        function getSpouseQcExperienceScore(months) {
            if (months < 6) return 0;
            if (months < 12) return 5;
            if (months < 24) return 10;
            if (months < 36) return 15;
            if (months < 48) return 23;
            return 30;
        }

        // Fonction pour mettre à jour l'interface selon le choix du conjoint
        function updateForm() {
            const hasSpouse = document.getElementById('hasSpouse').checked;
            const spouseSection = document.getElementById('spouseSection');
            spouseSection.style.display = hasSpouse ? 'block' : 'none';
            calculateScore();
        }

        // Fonction pour gérer l'affichage du séjour d'études
        function updateStudyDuration() {
            const studyStatus = document.getElementById('studyStatus').value;
            const studyDurationGroup = document.getElementById('studyDurationGroup');
            studyDurationGroup.style.display = studyStatus !== 'none' ? 'block' : 'none';
            calculateScore();
        }

        // Fonction principale de calcul du score
        function calculateScore() {
            const hasSpouse = document.getElementById('hasSpouse').checked;

            // Capital humain
            let humanCapital = 0;
            let humanDetails = [];

            // Français
            const frenchCategory = hasSpouse ? frenchScores.withSpouse : frenchScores.single;
            const oralComp = parseInt(document.getElementById('frenchOralComp').value);
            const oralProd = parseInt(document.getElementById('frenchOralProd').value);
            const writtenComp = parseInt(document.getElementById('frenchWrittenComp').value);
            const writtenProd = parseInt(document.getElementById('frenchWrittenProd').value);

            const frenchOralCompScore = frenchCategory.oral[oralComp] || 0;
            const frenchOralProdScore = frenchCategory.oral[oralProd] || 0;
            const frenchWrittenCompScore = frenchCategory.written[writtenComp] || 0;
            const frenchWrittenProdScore = frenchCategory.written[writtenProd] || 0;

            const frenchTotal = frenchOralCompScore + frenchOralProdScore + frenchWrittenCompScore + frenchWrittenProdScore;
            humanCapital += frenchTotal;
            if (frenchTotal > 0) humanDetails.push({ label: "Français", points: frenchTotal });

            // Âge
            const age = parseInt(document.getElementById('age').value);
            const ageCategory = hasSpouse ? ageScores.withSpouse : ageScores.single;
            const ageScore = age >= 45 ? 0 : (ageCategory[age] || 0);
            humanCapital += ageScore;
            if (ageScore > 0) humanDetails.push({ label: "Âge", points: ageScore });

            // Expérience
            const workExp = parseInt(document.getElementById('workExperience').value);
            const expScore = getExperienceScore(workExp, hasSpouse);
            humanCapital += expScore;
            if (expScore > 0) humanDetails.push({ label: "Expérience", points: expScore });

            // Éducation
            const education = parseInt(document.getElementById('education').value);
            let educationScore = education;
            if (hasSpouse) {
                // Ajuster les scores d'éducation pour le conjoint
                const educationMap = {
                    13: 11, 26: 22, 39: 33, 52: 44, 78: 66, 91: 77, 104: 88, 110: 93, 117: 99, 130: 110
                };
                educationScore = educationMap[education] || 0;
            }
            humanCapital += educationScore;
            if (educationScore > 0) humanDetails.push({ label: "Scolarité", points: educationScore });

            // Besoins du Québec
            let quebecNeeds = 0;
            let quebecDetails = [];

            // Profession
            const professionDiag = document.getElementById('professionDiag').value;
            const professionExp = parseInt(document.getElementById('professionExp').value);
            const profScore = getProfessionScore(professionDiag, professionExp);
            quebecNeeds += profScore;
            if (profScore > 0) quebecDetails.push({ label: "Profession", points: profScore });

            // Diplôme du Québec
            const quebecDiploma = parseInt(document.getElementById('quebecDiploma').value);
            quebecNeeds += quebecDiploma;
            if (quebecDiploma > 0) quebecDetails.push({ label: "Diplôme Québec", points: quebecDiploma });

            // Expérience au Québec
            const quebecWorkExp = parseInt(document.getElementById('quebecWorkExp').value);
            const qcExpScore = getQuebecExperienceScore(quebecWorkExp);
            quebecNeeds += qcExpScore;
            if (qcExpScore > 0) quebecDetails.push({ label: "Expérience QC", points: qcExpScore });

            // Séjour hors CMM
            const outsideMtlRes = parseInt(document.getElementById('outsideMtlResidence').value);
            const outsideMtlWork = parseInt(document.getElementById('outsideMtlWork').value);
            const outsideMtlStudy = parseInt(document.getElementById('outsideMtlStudy').value);

            const resScore = getOutsideMtlResidenceScore(outsideMtlRes);
            const workScore = getOutsideMtlWorkScore(outsideMtlWork);
            const studyScore = getOutsideMtlStudyScore(outsideMtlStudy);

            const cmmTotal = resScore + workScore + studyScore;
            quebecNeeds += cmmTotal;
            if (cmmTotal > 0) quebecDetails.push({ label: "Hors CMM", points: cmmTotal });

            // Offre d'emploi
            const jobOffer = parseInt(document.getElementById('jobOffer').value);
            quebecNeeds += jobOffer;
            if (jobOffer > 0) quebecDetails.push({ label: "Offre emploi", points: jobOffer });

            // Autorisation
            const hasAuth = document.getElementById('hasAuthorization').checked;
            if (hasAuth) {
                quebecNeeds += 50;
                quebecDetails.push({ label: "Autorisation", points: 50 });
            }

            // Facteurs d'adaptation
            let adaptation = 0;
            let adaptDetails = [];

            // Séjour d'études
            const studyStatus = document.getElementById('studyStatus').value;
            const studyDuration = parseInt(document.getElementById('studyDuration').value) || 0;
            const studySejourScore = getStudyScore(studyStatus, studyDuration);
            adaptation += studySejourScore;
            if (studySejourScore > 0) adaptDetails.push({ label: "Séjour études", points: studySejourScore });

            // Parenté
            const hasFamily = document.getElementById('hasFamily').checked;
            const spouseFamily = document.getElementById('spouseFamily').checked;
            let familyScore = 0;
            if (hasFamily && !spouseFamily) familyScore = 10;
            else if (spouseFamily && hasSpouse) familyScore = 5;
            adaptation += familyScore;
            if (familyScore > 0) adaptDetails.push({ label: "Parenté", points: familyScore });

            // Conjoint
            if (hasSpouse) {
                // Français du conjoint
                const spouseOralComp = parseInt(document.getElementById('spouseFrenchOralComp').value);
                const spouseOralProd = parseInt(document.getElementById('spouseFrenchOralProd').value);
                const spouseWrittenComp = parseInt(document.getElementById('spouseFrenchWrittenComp').value);
                const spouseWrittenProd = parseInt(document.getElementById('spouseFrenchWrittenProd').value);

                const spouseFrenchTotal = (spouseFrenchScores[spouseOralComp] || 0) +
                    (spouseFrenchScores[spouseOralProd] || 0) +
                    (spouseFrenchScores[spouseWrittenComp] || 0) +
                    (spouseFrenchScores[spouseWrittenProd] || 0);
                adaptation += spouseFrenchTotal;
                if (spouseFrenchTotal > 0) adaptDetails.push({ label: "Français conjoint", points: spouseFrenchTotal });

                // Âge du conjoint
                const spouseAge = parseInt(document.getElementById('spouseAge').value);
                const spouseAgeScore = spouseAge >= 45 ? 0 : (spouseAgeScores[spouseAge] || 0);
                adaptation += spouseAgeScore;
                if (spouseAgeScore > 0) adaptDetails.push({ label: "Âge conjoint", points: spouseAgeScore });

                // Expérience QC du conjoint
                const spouseQcExp = parseInt(document.getElementById('spouseQcExp').value);
                const spouseQcExpScore = getSpouseQcExperienceScore(spouseQcExp);
                adaptation += spouseQcExpScore;
                if (spouseQcExpScore > 0) adaptDetails.push({ label: "Exp. QC conjoint", points: spouseQcExpScore });

                // Éducation du conjoint
                const spouseEducation = parseInt(document.getElementById('spouseEducation').value);
                adaptation += spouseEducation;
                if (spouseEducation > 0) adaptDetails.push({ label: "Scolarité conjoint", points: spouseEducation });

                // Diplôme QC du conjoint
                const spouseQcDiploma = parseInt(document.getElementById('spouseQcDiploma').value);
                adaptation += spouseQcDiploma;
                if (spouseQcDiploma > 0) adaptDetails.push({ label: "Diplôme QC conjoint", points: spouseQcDiploma });
            }

            const totalScore = humanCapital + quebecNeeds + adaptation;

            // Afficher les résultats
            document.getElementById('humanCapitalScore').textContent = humanCapital;
            document.getElementById('quebecNeedsScore').textContent = quebecNeeds;
            document.getElementById('adaptationScore').textContent = adaptation;
            document.getElementById('totalScore').textContent = totalScore;

            // Afficher les détails
            displayDetails('humanCapitalDetails', humanDetails);
            displayDetails('quebecNeedsDetails', quebecDetails);
            displayDetails('adaptationDetails', adaptDetails);

            // Analytics - Log score calculation
            if (window.firebaseAnalytics && window.logFirebaseEvent) {
                // Log du calcul avec catégorie de score
                let scoreCategory = 'very_low';
                if (totalScore >= 1200) scoreCategory = 'excellent';
                else if (totalScore >= 1000) scoreCategory = 'very_good';
                else if (totalScore >= 800) scoreCategory = 'good';
                else if (totalScore >= 600) scoreCategory = 'moderate';
                else if (totalScore >= 400) scoreCategory = 'low';

                window.logFirebaseEvent(window.firebaseAnalytics, 'score_calculated', {
                    total_score: totalScore,
                    score_category: scoreCategory,
                    has_spouse: hasSpouse,
                    human_capital: humanCapital,
                    quebec_needs: quebecNeeds,
                    adaptation: adaptation,
                    french_level: Math.round((oralComp + oralProd + writtenComp + writtenProd) / 4),
                    age_group: age < 25 ? '18-24' : age < 35 ? '25-34' : age < 45 ? '35-44' : '45+'
                });
            }
        }

        // Fonction pour afficher les détails des scores
        function displayDetails(elementId, details) {
            const element = document.getElementById(elementId);
            if (details.length === 0) {
                element.innerHTML = '';
                return;
            }

            let html = '';
            details.forEach(detail => {
                html += `<div class="detail-line">
            <span class="detail-label">${detail.label}</span>
            <span class="detail-points">${detail.points} pts</span>
        </div>`;
            });
            element.innerHTML = html;
        }

        // Ajouter les événements
        document.addEventListener('DOMContentLoaded', function () {

            if (window.firebaseAnalytics && window.logFirebaseEvent) {
                window.logFirebaseEvent(window.firebaseAnalytics, 'page_view', {
                    page_title: 'PSTQ Calculator',
                    page_location: window.location.href
                });
            }
            // Événements pour tous les inputs
            const inputs = document.querySelectorAll('input[type="number"], select');
            inputs.forEach(input => {
                input.addEventListener('change', calculateScore);
            });

            // Événements pour les checkboxes
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', calculateScore);
            });

            // Événements spéciaux
            document.getElementById('hasSpouse').addEventListener('change', updateForm);
            document.getElementById('studyStatus').addEventListener('change', updateStudyDuration);

            // Calcul initial
            calculateScore();
        });