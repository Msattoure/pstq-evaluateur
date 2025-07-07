function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  const username = data.username || 'Anonyme';
  
  // Chercher si le username existe déjà
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  let userRowIndex = -1;
  
  // Parcourir les lignes (commence à 1 pour ignorer l'en-tête)
  for (let i = 1; i < values.length; i++) {
    if (values[i][2] === username) { // Colonne C = username
      userRowIndex = i + 1; // +1 car les index sheets commencent à 1
      break;
    }
  }
  
  if (userRowIndex > 0) {
    // Username existe - mettre à jour avec le nouveau score (peu importe s'il est meilleur ou pas)
    sheet.getRange(userRowIndex, 1).setValue(new Date()); // Date
    sheet.getRange(userRowIndex, 2).setValue(data.score); // Score (toujours mis à jour)
    sheet.getRange(userRowIndex, 4).setValue(data.ip || 'Unknown'); // IP
  } else {
    // Nouveau username - ajouter une ligne
    sheet.appendRow([
      new Date(),
      data.score,
      username,
      data.ip || 'Unknown'
    ]);
  }
  
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'success',
      updated: userRowIndex > 0
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Fonction pour obtenir les statistiques
function doGet() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  // Calculer la moyenne et le nombre de participants
  const scores = data.slice(1) // Skip header
    .map(row => row[1]) // Colonne B = score
    .filter(score => score !== '' && score !== null && score !== undefined);
  
  const totalParticipants = scores.length;
  const averageScore = totalParticipants > 0 ? 
    Math.round(scores.reduce((sum, score) => sum + score, 0) / totalParticipants) : 0;
  
  return ContentService
    .createTextOutput(JSON.stringify({
      averageScore: averageScore,
      totalParticipants: totalParticipants
    }))
    .setMimeType(ContentService.MimeType.JSON);
} 