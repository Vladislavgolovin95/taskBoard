import { FirebaseOptions, initializeApp } from 'firebase/app';
import { collection, deleteDoc, doc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { ITask } from 'types/types';

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyBbdIUMvg9FTRHw1Ni11sY9rsubBqb0v_8',
  authDomain: 'tasks-27e50.firebaseapp.com',
  projectId: 'tasks-27e50',
  storageBucket: 'tasks-27e50.appspot.com',
  messagingSenderId: '589528834597',
  appId: '1:589528834597:web:60545c35374d26427115cc',
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
