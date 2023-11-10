import { useState } from "react";

export default function Item({ item: i }) {
    const [item, setItem] = useState(i);

    function toggle() {
        fetch(`http://localhost:3001/items/${item.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...item, // 복사본을 만들어서 이전 상태를 변경하지 않음
                status: item.status === "done" ? "todo" : "done",
            }),
        }).then((res) => {
            if (res.ok) {
                setItem({
                    ...item, // 복사본을 만들어서 이전 상태를 변경하지 않음
                    status: item.status === "done" ? "todo" : "done",
                });
            }
        });
    }

    const deleteItem = () => {
        if (window.confirm("삭제 하시겠습니까?")) {
            fetch(`http://localhost:3001/items/${item.id}`, {
                method: "DELETE",
            }).then((res) => {
                if (res.ok) {
                    setItem({ item: 0 });
                }
            });
        }
    };

    if (item.id === 0) {
        return null;
    }

    return (
        <tr>
            <td>
                <input
                    type="checkbox"
                    checked={item.status === "done" ? true : false}
                    onClick={toggle}
                />
            </td>
            <td>{i.task}</td>
            <td>{i.due}</td>
            <td>
                <button onClick={deleteItem}>Delete</button>
            </td>
        </tr>
    );
}


// http://localhost:3001/items?status=todo
// http://localhost:3001/items?status=done