import { PolicyAnalysis, RegisterUserRequest, Resource, Role, User } from '@/models/model';
import axios from 'axios';
import { retrieveCodeDiagnostics } from './antlr/rpl_code_validator';


export const API_BASE = 'http://localhost:8000';




// useEffect(() => {
//   fetch("/routes")
//     .then(res => res.json())
//     .then(data => console.log(data));
// }, []);



export async function get_data() {
    const token = localStorage.getItem('token')

    try {
        const [one, two] = await Promise.all(
            [
                axios.get(API_BASE, {
                    headers: { 'Authorization': `Bearer ${token}` }
                }),

                axios.get(API_BASE, {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
            ]
        )
    } catch (error) {
        console.log(error);

    }

}

export const api = {

    async evaluate_code(code: string) {

        try {
            const response = await axios.post(API_BASE + "/code/analyze", {
                code: code,
                use_llm: false
            })

            console.log(response);


            return response.data

        } catch (error) {
            console.log(error);
            return null

        }

    },
    async userLogin(params: URLSearchParams) {

        try {

            const response = await axios.post(API_BASE + "/auth/login", params, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            })

            axios.defaults.headers.common["Authorization"] =
                `Bearer ${response.data.access_token}`
            console.log(response);

            return response.data

        } catch (error) {
            console.log(error);
            return null

        }

    },
    async get_llm_findings() {
        try {
            const response = await axios.post(API_BASE + "/code/insight")

            console.log(response);

            return response.data

        } catch (error) {
            console.log(error);
            return null

        }
    },
    async userSimulationCheck(username: string) {
        try {
            const response = await axios.post(API_BASE + "/api/simulation")

            console.log(response);

            return response.data

        } catch (error) {
            console.log(error);
            return null

        }
    },
    async retrieveAllUsers() {
        try {
            const response = await axios.get(API_BASE + "/user/all")

            console.log(response);

            return response.data

        } catch (error) {
            console.log(error);
            return null

        }
    },
    async registerUser(userDetails: RegisterUserRequest) {
        try {
            const response = await axios.post(
                API_BASE + "/user/save/user-details",
                {
                    first_name: userDetails.first_name,
                    last_name: userDetails.last_name,
                    username: userDetails.username,
                    email: userDetails.email,
                    password: userDetails.password,
                }

            );

            console.log(response);
            return response.data;
        } catch (error: any) {
            console.error("Registration failed:", error.response?.data || error.message);
            return null;
        }
    },
    async checkUserName(username: string) {
        try {
            const response = await axios.get(API_BASE + `/user/username/check/${username}`)

            console.log(response);

            return response.data

        } catch (error) {
            console.log(error);
            return null

        }
    },
    async retrieveAllRoles() {
        try {
            const response = await axios.get(API_BASE + "/api/role")

            console.log(response);

            return response.data

        } catch (error) {
            console.log(error);
            return null

        }
    },

    async retrieveEndpoints(token: string) {
        try {
            const response = await axios.get(API_BASE + "/api/role")

            console.log(response);

            return response.data

        } catch (error) {
            console.log(error);
            return null

        }
    },
    async retrieveTableSchema() {
        try {
            const response = await axios.get(API_BASE + "/api/databases/see/tables")

            console.log(response);

            return response.data

        } catch (error) {
            console.log(error);
            return null

        }
    },

    async retrieveTableRows(db_key: string, table_name: string) {
        try {
            const response = await axios.get(API_BASE + `/api/databases/${db_key}/tables/${table_name}/rows`)

            console.log(response);

            return response.data

        } catch (error) {
            console.log(error);
            return null

        }
    },
    async deleteTableRow(db_key: string, table_name: string, row_id: number) {
        try {
            const response = await axios.get(API_BASE + `/api/databases/${db_key}/tables/${table_name}/rows/${row_id}`)

            console.log(response);

            return response.data

        } catch (error) {
            console.log(error);
            return null

        }
    },
    async updateTableRow(db_key: string, table_name: string, row_id: number, tableData: any) {
        try {
            const response = await axios.patch(API_BASE + `/api/databases/${db_key}/tables/${table_name}/rows/${row_id}`, {
                updates: tableData
            })

            console.log(response);

            return response.data

        } catch (error) {
            console.log(error);
            return null

        }
    },
    async fetchEndpoints() {
        try {
            const response = await axios.get(API_BASE + "/rest/api/endpoints")

            console.log(response);

            return response.data

        } catch (error) {
            console.log(error);
            return null

        }
    },

};