import { TaskForm } from "src/components/AntMovements/TaskForm/TaskForm";

import Styles from './AntMovements.module.scss';

export const AntMovements = () => {  
  return (
    <div className={Styles.container}>
      <TaskForm />
    </div>
  )
}
