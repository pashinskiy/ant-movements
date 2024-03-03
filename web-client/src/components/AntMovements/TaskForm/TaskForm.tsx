import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import { NumberInput } from "../../common/NumberInput/NumberInput";
import { Button } from "../../common/Button/Button";
import { Loader } from "../../common/Loader/Loader";
import { PlayingField } from "../PlayingField/PlayingField";

import { getAntMovementsSolution } from "../../../services/getAntMovementsSolution";

import Styles from './TaskForm.module.scss';

interface ISolution {
  validCellsCount: number;
  cells: Array<(1 | null)[] | null>;
  croppedField: {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
  };
}

const initialValues = {
  x: '',
  y: '',
  maxSum: '',
};

const validationSchema = yup.object({
  x: yup.string().required("обязательное поле"),
  y: yup.string().required("обязательное поле"),
  maxSum: yup.string().required("обязательное поле"),
})

export const TaskForm = () => {
  const [solution, setSolution] = useState<null|ISolution>(null);
  const [wasSendAttempt, setWasSendAttempt] = useState(false);

  const {
    values,
    handleChange,
    handleSubmit,
    isSubmitting,
    setSubmitting,
    errors,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: useCallback((values: Record<string, string>) => {
      getAntMovementsSolution({
        params: values,
        callback: ({data}) => {          
          setSolution(data.success);
        }
      });
    }, [])
  });

  const onSubmitHandle = useCallback((e: FormEvent<HTMLFormElement>) => {    
    e.preventDefault()
    setWasSendAttempt(true);
    handleSubmit();
  }, []);

  useEffect(() => {
    if (isSubmitting) {
      setSolution(null);
    }
  }, [isSubmitting]);
  
  return (
    <form
      onSubmit={onSubmitHandle}
      className={Styles.form}
    >
      <div className={Styles.text}>
        На координатной сетке находится муравей. Муравей может перемещаться на 1 клетку вверх, вниз,
        влево и вправо, по одной клетке за шаг. Клетки, в которых сумма цифр в X - координате плюс сумма
        цифр в Y - координате больше, чем заданная максимальная сумма, недоступны муравью.
        <br/>
        <br/>
        Сколько клеток может посетить муравей, с выбранной начальной позиции (включая начальную клетку)?
      </div>

      <div className={Styles.inputsWrapper}>
        <NumberInput
          label="X - координата"
          name="x"
          value={values.x}
          min={0}
          max={10000}
          validationError={wasSendAttempt && errors.x}
          onChange={handleChange}
        />
        <NumberInput
          label="Y - координата"
          name="y"
          value={values.y}
          min={0}
          max={10000}
          validationError={wasSendAttempt && errors.y}
          onChange={handleChange}
        />
        <NumberInput
          label="Макс. сумма"
          name="maxSum"
          value={values.maxSum}
          min={0}
          max={30}
          validationError={wasSendAttempt && errors.maxSum}
          onChange={handleChange}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? <Loader />
          : 'получить ответ'
        }
      </Button>
      
      {solution && (
        <>
          <div className={Styles.text}>
            Количество уникальных клеток, которые муравей сможет посетить: {solution.validCellsCount} 
          </div>

          <PlayingField
            croppedField={solution.croppedField}
            cells={solution.cells}
            onAfterRender={() => {
              setSubmitting(false);
            }}
          />
        </>
      )}
    </form>
  )
}
