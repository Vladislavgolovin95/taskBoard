import { FirebaseOptions, initializeApp } from 'firebase/app';
import { collection, deleteDoc, doc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { ITask } from 'types/types';

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const key: string = 'tasks';

export const getTasksToFirestore = async () => {
  const querySnapshot = await getDocs(collection(db, key));
  const tasks = <ITask[]>[];
  querySnapshot.forEach((doc) => {
    tasks.push({
      id: doc.data().id,
      title: doc.data().title,
      status: doc.data().status,
      priority: doc.data().priority,
    });
  });
  return tasks;
};

export const addTaskToFirestore = async (task: ITask) => {
  try {
    await setDoc(doc(db, key, task.id), {
      id: task.id,
      title: task.title,
      status: task.status,
      priority: task.priority,
    });
  } catch (err) {
    console.error('Error adding document: ', err);
  }
};

export const removeTaskToFirestore = async (id: string) => {
  await deleteDoc(doc(db, key, id));
};

export const updateTaskToFirestore = async (id: string, newStatus: string) => {
  const ref = doc(db, key, id);
  await updateDoc(ref, {
    status: newStatus,
  });
};
