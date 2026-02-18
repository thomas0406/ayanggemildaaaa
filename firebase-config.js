// ============================================
// FIREBASE CONFIGURATION
// ============================================
// Ganti konfigurasi ini dengan project Firebase Anda
// Lihat: https://console.firebase.google.com

const firebaseConfig = {
  apiKey: "AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "your-project-id.firebaseapp.com",
  databaseURL: "https://your-project-id-default-rtdb.asia-southeast1.firebasebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

// Initialize Firebase (akan di-load di HTML)
let firebaseInitialized = false;

function initializeFirebase() {
  if (firebaseInitialized) return;
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Get database reference
  window.db = firebase.database();
  window.auth = firebase.auth();
  
  firebaseInitialized = true;
  console.log('✓ Firebase initialized successfully');
}

// ============================================
// FIREBASE FUNCTIONS
// ============================================

// Save entry ke Firebase
async function saveEntryToFirebase(diaryId, entry) {
  try {
    if (!window.db) initializeFirebase();
    
    await window.db.ref(`diaries/${diaryId}/entries/${entry.id}`).set(entry);
    console.log('✓ Entry saved to Firebase:', entry.id);
    return true;
  } catch (error) {
    console.error('❌ Error saving to Firebase:', error);
    return false;
  }
}

// Load entries dari Firebase
async function loadEntriesFromFirebase(diaryId) {
  try {
    if (!window.db) initializeFirebase();
    
    const snapshot = await window.db.ref(`diaries/${diaryId}/entries`).once('value');
    const entries = [];
    
    snapshot.forEach(child => {
      entries.push(child.val());
    });
    
    // Sort by date descending
    entries.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    console.log(`✓ Loaded ${entries.length} entries from Firebase`);
    return entries;
  } catch (error) {
    console.error('❌ Error loading from Firebase:', error);
    return [];
  }
}

// Sync dengan localStorage sebagai fallback
function syncLocalStorageToFirebase(diaryId) {
  const entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
  console.log(`Syncing ${entries.length} entries to Firebase...`);
  
  entries.forEach(entry => {
    saveEntryToFirebase(diaryId, entry);
  });
}

// Generate unique diary ID dari password
function generateDiaryId(password) {
  return CryptoJS.SHA256(password).toString().substring(0, 16);
}

// Setup real-time listener
function setupRealtimeListener(diaryId, callback) {
  if (!window.db) initializeFirebase();
  
  window.db.ref(`diaries/${diaryId}/entries`).on('value', async (snapshot) => {
    const entries = [];
    snapshot.forEach(child => {
      entries.push(child.val());
    });
    
    entries.sort((a, b) => new Date(b.date) - new Date(a.date));
    callback(entries);
  });
}

// Delete entry from Firebase
async function deleteEntryFromFirebase(diaryId, entryId) {
  try {
    if (!window.db) initializeFirebase();
    
    await window.db.ref(`diaries/${diaryId}/entries/${entryId}`).remove();
    console.log('✓ Entry deleted from Firebase:', entryId);
    return true;
  } catch (error) {
    console.error('❌ Error deleting from Firebase:', error);
    return false;
  }
}
