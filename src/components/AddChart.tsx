import { useState } from 'react';
import Modal from './Modal';
import { ActionButton } from './ActionButton';

const AddChart = ({
    addChart,
    type,
}: {
    addChart: any;
    type: 'line' | 'pie';
}) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const [formData, setFormData] = useState<{
        title: string;
        subtext: string;
        data: { value: number; name: string }[];
    }>({
        title: '',
        subtext: '',
        data: [],
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDataInputChange = (
        index: number,
        property: string,
        value: number | string
    ) => {
        setFormData((prevData) => ({
            ...prevData,
            data: prevData?.data?.map((el, idx) => {
                if (index === idx) {
                    return { ...el, [property]: value };
                }
                return el;
            }),
        }));
    };

    const handleAddData = () => {
        setFormData((prevData) => ({
            ...prevData,
            data: [...prevData.data, { value: 0, name: '' }],
        }));
    };

    const handleRemoveData = (index: number) => {
        const newData = [...formData.data];
        newData.splice(index, 1);
        setFormData((prevData) => ({
            ...prevData,
            data: newData,
        }));
    };

    const generateChartOption = () => {
        if (type === 'pie') {
            return {
                title: {
                    text: formData.title,
                    subtext: formData.subtext,
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: '50%',
                        data: formData.data,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                            },
                        },
                    },
                ],
            };
        }
        return {
            xAxis: {
                type: 'category',
                data: formData.data?.map((item) => item.name),
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    data: formData.data?.map((item) => item.value),
                    type: 'line',
                },
            ],
        };
    };

    const createChart = () => {
        addChart(generateChartOption(), 400, 300);
        closeModal();
    };

    return (
        <>
            <ActionButton
                label={`Add ${type === 'pie' ? 'Pie' : 'Line'} Chart`}
                onClick={openModal}
            />
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h1 className="text-2xl font-bold mb-4">Add {type === 'pie' ? 'Pie' : 'Line'} Chart Data</h1>
                <div className="flex flex-col p-2 gap-2">
                    <div className="flex items-center gap-2">
                        <label htmlFor="title" className="min-w-[100px]">
                            Title:
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="border-[1px] border-slate-200 w-full px-2 py-1 rounded-md"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="subtext" className="min-w-[100px]">
                            Subtext:
                        </label>
                        <input
                            type="text"
                            id="subtext"
                            name="subtext"
                            value={formData.subtext}
                            onChange={handleInputChange}
                            className="border-[1px] border-slate-200 w-full px-2 py-1 rounded-md"
                        />
                    </div>
                    <h3>Data:</h3>
                    <div className="flex flex-col gap-1 border-[1px] border-slate-200 text-sm rounded-md">
                        <div className="w-full p-1 flex gap-2 border-b-[1px] border-slate-200">
                            <div className="w-[40%] text-center">Label</div>
                            <div className="w-[40%] text-center">Value</div>
                            <div className="w-[20%] text-center"></div>
                        </div>
                        {formData.data.map((dataItem, index) => (
                            <div key={index} className="w-full p-1 flex gap-2">
                                <input
                                    className="border-[1px] border-slate-200 px-2 py-1 rounded-md w-[40%]"
                                    type="text"
                                    placeholder="label"
                                    id={`name-${index}`}
                                    value={dataItem.name}
                                    onChange={(e) =>
                                        handleDataInputChange(
                                            index,
                                            'name',
                                            e.target.value
                                        )
                                    }
                                />
                                <input
                                    className="border-[1px] border-slate-200 px-2 py-1 rounded-md w-[40%]"
                                    type="number"
                                    placeholder="value"
                                    id={`value-${index}`}
                                    value={dataItem.value}
                                    onChange={(e) =>
                                        handleDataInputChange(
                                            index,
                                            'value',
                                            parseInt(e.target.value)
                                        )
                                    }
                                />
                                <button
                                    className="border-[1px] bg-slate-200 px-2 py-1 rounded-md w-[20%] hover:text-red-600 hover:bg-red-200"
                                    type="button"
                                    onClick={() => handleRemoveData(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            className="w-full py-1 px-2 border-[1px] bg-slate-200 rounded-md"
                            onClick={handleAddData}
                        >
                            Add Data
                        </button>
                    </div>

                    <button
                        type="button"
                        className="mt-2 w-full py-1 px-2 border-[1px] bg-violet-600 text-white rounded-md"
                        onClick={createChart}
                    >
                        Create {type === 'pie' ? 'Pie' : 'Line'} Chart
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default AddChart;
