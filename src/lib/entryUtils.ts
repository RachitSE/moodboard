import { doc, setDoc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "./firebase";

interface EntryData {
  mood?: string;
  journal?: string;
}

// Save or update a single journal entry
export async function saveEntry(uid: string, date: string, data: EntryData) {
  const ref = doc(db, "users", uid, "entries", date);
  await setDoc(ref, data, { merge: true });
}

// Get a single journal entry by date
export async function getEntry(uid: string, date: string): Promise<EntryData | null> {
  const ref = doc(db, "users", uid, "entries", date);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as EntryData) : null;
}

// Get all entries for a user
export async function getAllEntries(uid: string): Promise<Record<string, EntryData>> {
  const ref = collection(db, "users", uid, "entries");
  const snapshot = await getDocs(ref);

  const data: Record<string, EntryData> = {};
  snapshot.forEach((doc) => {
    data[doc.id] = doc.data() as EntryData;
  });

  return data;
}
