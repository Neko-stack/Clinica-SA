import { useState, useEffect } from "react"
import axios from "axios"
import { FaUserAlt } from "react-icons/fa"
import { Link } from "react-router"

const PatientsList = () => {
    const [patients, setPatients] = useState([])
    const [ages, setAges] = useState({})

    const [filters, setFilters] = useState({
        name: "",
        email: "",
        phone: "",
        healthInsurance: "",
        allergies: "",
    })

    const calculateAge = (birthdate) => {
        if (!birthdate) return "-"

        const today = new Date()
        const birthdateDate = new Date(birthdate)

        let age = today.getFullYear() - birthdateDate.getFullYear()
        const monthDiff = today.getMonth() - birthdateDate.getMonth()

        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthdateDate.getDate())
        ) {
            age--
        }

        return age
    }

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get("http://localhost:3000/patients")
                if (!response) return

                const patientsData = response.data

                const calculatedAges = {}
                patientsData.forEach((patient) => {
                    calculatedAges[patient.id] = calculateAge(patient.birthdate)
                })

                setAges(calculatedAges)
                setPatients(patientsData)
            } catch (error) {
                console.error("Erro ao obter os dados de paciente", error)
            }
        }

        fetchPatients()
    }, [])

    const handleFilterChange = (event) => {
        const { name, value } = event.target

        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const clearFilters = () => {
        setFilters({
            name: "",
            email: "",
            phone: "",
            healthInsurance: "",
            allergies: "",
        })
    }

    const filteredPatients = patients.filter((patient) => {
        const nameMatch = patient.fullName
            ?.toLowerCase()
            .includes(filters.name.toLowerCase())

        const emailMatch = patient.email
            ?.toLowerCase()
            .includes(filters.email.toLowerCase())

        const phoneMatch = patient.phone
            ?.toLowerCase()
            .includes(filters.phone.toLowerCase())

        const insuranceMatch = patient.healthInsurance
            ?.toLowerCase()
            .includes(filters.healthInsurance.toLowerCase())

        const allergiesMatch = patient.allergies
            ?.toLowerCase()
            .includes(filters.allergies.toLowerCase())

        return (
            nameMatch &&
            emailMatch &&
            phoneMatch &&
            insuranceMatch &&
            allergiesMatch
        )
    })

    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6 mt-8">
            <h2 className="text-xl font-semibold text-cyan-800 dark:text-cyan-300 mb-4">
                Informações Rápidas de Pacientes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <input
                    type="text"
                    name="name"
                    value={filters.name}
                    onChange={handleFilterChange}
                    placeholder="Filtrar por nome"
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-600 outline-none"
                />

                <input
                    type="text"
                    name="email"
                    value={filters.email}
                    onChange={handleFilterChange}
                    placeholder="Filtrar por email"
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-600 outline-none"
                />

                <input
                    type="text"
                    name="phone"
                    value={filters.phone}
                    onChange={handleFilterChange}
                    placeholder="Filtrar por telefone"
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-600 outline-none"
                />

                <input
                    type="text"
                    name="healthInsurance"
                    value={filters.healthInsurance}
                    onChange={handleFilterChange}
                    placeholder="Filtrar por convênio"
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-600 outline-none"
                />

                <input
                    type="text"
                    name="allergies"
                    value={filters.allergies}
                    onChange={handleFilterChange}
                    placeholder="Filtrar por alergias"
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-600 outline-none"
                />

                <button
                    type="button"
                    onClick={clearFilters}
                    className="bg-gray-200 text-gray-700 rounded-lg px-3 py-2 hover:bg-gray-300 transition"
                >
                    Limpar filtros
                </button>
            </div>

            {filteredPatients.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                    {filteredPatients.map((patient) => (
                        <li
                            key={patient.id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between py-4"
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-cyan-100 text-cyan-700 p-3 rounded-full">
                                    <FaUserAlt size={20} />
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-800 dark:text-gray-100">
                                        {patient.fullName}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        {patient.email}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        {patient.phone}
                                    </p>
                                </div>
                            </div>

                            <div className="text-sm text-gray-600 mt-2 sm:mt-0 text-right">
                                <p>
                                    <strong>Idade:</strong>{" "}
                                    {ages[patient.id] || "-"} anos
                                </p>
                                <p>
                                    <strong>Plano:</strong>{" "}
                                    {patient.healthInsurance || "-"}
                                </p>
                                <p>
                                    <strong>Alergias:</strong>{" "}
                                    {patient.allergies || "-"}
                                </p>

                                <Link
                                    to={`/paciente/${patient.id}`}
                                    className="text-cyan-700 font-semibold hover:underline"
                                >
                                    Ver detalhes
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 text-center py-6">
                    Nenhum paciente encontrado
                </p>
            )}
        </div>
    )
}

export default PatientsList