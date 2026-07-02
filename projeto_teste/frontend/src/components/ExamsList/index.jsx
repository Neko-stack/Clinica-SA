import { useState, useEffect } from "react"
import apiClient from "../../api/api"

const ExamsList = () => {
    const [page, setPage] = useState(1)
    const [exams, setExams] = useState([])
    const [total, setTotal] = useState()
    const [totalPage, setTotalPage] = useState()
    const [sortOrder, setSortOrder] = useState("recent")

    const limite = 10

    useEffect(() => {
        const fetchExames = async () => {
            try {
                const response = await apiClient.get(
                    `/exames?pagina=${page}&limite=${limite}`
                )

                if (response.data) {
                    setExams(response.data.exames)
                    setTotal(response.data.total)
                    setTotalPage(response.data.totalPages)
                }
            } catch (error) {
                console.error("Erro ao listar exames", error)
            }
        }

        fetchExames()
    }, [page])

    const sortedExams = [...(exams || [])].sort((a, b) => {
        const dateA = new Date(a.data_exame || a.date)
        const dateB = new Date(b.data_exame || b.date)

        if (sortOrder === "recent") {
            return dateB - dateA
        }

        return dateA - dateB
    })

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-cyan-800">
                    Lista de exames
                </h2>

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="border rounded-lg px-3 py-2"
                >
                    <option value="recent">Mais recentes primeiro</option>
                    <option value="oldest">Mais antigos primeiro</option>
                </select>
            </div>

            {sortedExams.length ? (
                <>
                    <table className="w-full bg-white rounded-lg shadow overflow-hidden">
                        <thead>
                            <tr className="bg-cyan-800 text-white">
                                <th className="p-2">ID</th>
                                <th className="p-2">Tipo de Exame</th>
                                <th className="p-2">Descrição</th>
                                <th className="p-2">Data do Exame</th>
                                <th className="p-2">Valor</th>
                                <th className="p-2">Resultado</th>
                            </tr>
                        </thead>

                        <tbody>
                            {sortedExams.map((exame) => (
                                <tr key={exame.id} className="border-b">
                                    <td className="p-2">{exame.id}</td>
                                    <td className="p-2">
                                        {exame.tipo_exame || exame.type}
                                    </td>
                                    <td className="p-2">
                                        {exame.descricao || exame.name}
                                    </td>
                                    <td className="p-2">
                                        {exame.data_exame || exame.date}
                                    </td>
                                    <td className="p-2">
                                        {exame.valor || "-"}
                                    </td>
                                    <td className="p-2">
                                        <em>{exame.resultado || exame.results}</em>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex gap-5 items-center justify-center mt-4">
                        <span>
                            Resultado {limite * page} de {total}
                        </span>

                        {Array.from(Array(totalPage)).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i + 1)}
                                className={`px-2 py-1 ${
                                    i + 1 === page
                                        ? "bg-cyan-950"
                                        : "bg-cyan-600"
                                } cursor-pointer text-white rounded-lg`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </>
            ) : (
                <span>Sem dados!</span>
            )}
        </>
    )
}

export default ExamsList