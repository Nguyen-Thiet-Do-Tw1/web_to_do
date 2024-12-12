import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { fetchALLUserAPI } from '../services/api.service';
import { useEffect, useState } from 'react';
const UserPage = () => {

    const [dataUsers, setDataUser] = useState([])

    

    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        loadUser();
    }, [current, pageSize]);

    const loadUser = async () => {
        const res = await fetchALLUserAPI(current, pageSize);
        if (res.data) {
            setDataUser(res.data.result);
    
            if (current !== res.data.meta.current) {
                setCurrent(res.data.meta.current);
            }
            if (pageSize !== res.data.meta.pageSize) {
                setPageSize(res.data.meta.pageSize);
            }
    
            setTotal(res.data.meta.total);
        }
    };
    
    return (
        <div style={{ padding: "20px" }}>
            <UserForm loadUser={loadUser} />
            <UserTable
                loadUser={loadUser}
                dataUsers={dataUsers}
                current={current}
                pageSize={pageSize}
                total={total}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
            />
        </div>
    )
}
export default UserPage;