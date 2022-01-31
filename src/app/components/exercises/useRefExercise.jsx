import React, { useRef } from "react";
import CollapseWrapper from "../common/collapse";

const UseRefExercise = () => {
    const changedBlockRef = useRef();
    const handleChange = () => {
        const child = changedBlockRef.current.children[0];
        if (child.innerText === "Блок") {
            child.innerText = "text";
            changedBlockRef.current.style.height = "150px";
            changedBlockRef.current.style.width = "80px";
        } else {
            child.innerText = "Блок";
            changedBlockRef.current.style.height = "40px";
            changedBlockRef.current.style.width = "60px";
        }
    };
    return (
        <CollapseWrapper title="Упражнение">
            <p className="mt-3">
                У вас есть блок, у которого заданы ширина и высота. Добавьте
                кнопку, при нажатии которой изменятся следующие свойства:
            </p>
            <ul>
                <li>Изменится содержимое блока на &quot;text&quot;</li>
                <li>высота и ширина станут равны 150 и 80 соответственно</li>
            </ul>
            <div
                className="bg-primary d-flex flex-row justify-content-center align-items-center rounded"
                ref={changedBlockRef}
                style={{
                    height: 40,
                    width: 60,
                    color: "white"
                }}
            >
                <small>Блок</small>
            </div>
            <button className="btn btn-secondary mt-2" onClick={handleChange}>
                Изменить
            </button>
        </CollapseWrapper>
    );
};

export default UseRefExercise;
