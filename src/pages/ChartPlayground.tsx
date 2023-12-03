import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import { fabric } from 'fabric';
import { install } from 'echarts-fabric';
import { useEffect, useState } from 'react';

install(fabric);

type ActionButtonProps = {
    label?: string;
    isActive?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
const ActionButton = ({ label, isActive, onClick }: ActionButtonProps) => {
    const className = `border-slate-200 border-[1px] rounded-md px-3 py-1 text-sm hover:border-violet-800 hover:text-violet-800 ${
        isActive ? 'border-violet-600 text-violet-600' : ''
    }`;
    return (
        <button className={className} onClick={onClick}>
            {label}
        </button>
    );
};

const ChartPlayground = () => {
    const { editor, onReady } = useFabricJSEditor();
    const history: any[] = [];
    const [cropImage, setCropImage] = useState(true);

    useEffect(() => {
        const setupCanvasEvents = () => {
            const canvas: any = editor?.canvas;

            if (!canvas) {
                return;
            }

            if (cropImage) {
                canvas.__eventListeners = {};
                return;
            }

            const handleMouseWheel = (opt: any) => {
                const delta = opt.e.deltaY;
                let zoom = canvas.getZoom();
                zoom *= 0.999 ** delta;
                zoom = Math.min(Math.max(zoom, 0.01), 20);

                canvas.zoomToPoint(
                    { x: opt.e.offsetX, y: opt.e.offsetY },
                    zoom
                );
                opt.e.preventDefault();
                opt.e.stopPropagation();
            };

            const handleMouseDown = (opt: fabric.IEvent) => {
                const evt: any = opt.e;
                if (evt.ctrlKey === true && canvas) {
                    canvas.isDragging = true;
                    canvas.selection = false;
                    canvas.lastPosX = evt.clientX;
                    canvas.lastPosY = evt.clientY;
                }
            };

            const handleMouseMove = (opt: fabric.IEvent) => {
                const e: any = opt.e;
                if (canvas?.isDragging) {
                    const vpt = canvas.viewportTransform;
                    vpt[4] += e.clientX - canvas.lastPosX;
                    vpt[5] += e.clientY - canvas.lastPosY;
                    canvas.requestRenderAll();
                    canvas.lastPosX = e.clientX;
                    canvas.lastPosY = e.clientY;
                }
            };

            const handleMouseUp = () => {
                if (canvas) {
                    canvas.setViewportTransform(canvas.viewportTransform);
                    canvas.isDragging = false;
                    canvas.selection = true;
                }
            };

            canvas.on('mouse:wheel', handleMouseWheel);
            canvas.on('mouse:down', handleMouseDown);
            canvas.on('mouse:move', handleMouseMove);
            canvas.on('mouse:up', handleMouseUp);

            return () => {
                canvas.off('mouse:wheel', handleMouseWheel);
                canvas.off('mouse:down', handleMouseDown);
                canvas.off('mouse:move', handleMouseMove);
                canvas.off('mouse:up', handleMouseUp);
            };
        };

        if (editor) {
            setupCanvasEvents();
            editor.canvas?.renderAll();
        }
    }, [cropImage]);

    const onAddLine = () => {
        editor?.addLine();
    };

    const onDeleteSelectedObject = () => {
        if (editor?.canvas?.getActiveObject()) {
            editor?.canvas?.remove(editor?.canvas?.getActiveObject() as any);
        }
    };

    const [isDrawingMode, setIsDrawingMode] = useState(false);
    useEffect(() => {
        if (editor?.canvas) editor.canvas.isDrawingMode = isDrawingMode;
    }, [isDrawingMode]);
    const onToggleDraw = () => {
        setIsDrawingMode((prev) => !prev);
    };

    const onUndo = () => {
        if (editor?.canvas) {
            if (editor.canvas._objects.length > 0) {
                history.push(editor?.canvas._objects.pop());
            }
            editor?.canvas.renderAll();
        }
    };

    const onRedo = () => {
        if (history.length > 0) {
            editor?.canvas.add(history?.pop());
        }
    };

    const onClear = () => {
        editor?.canvas._objects.splice(0, editor?.canvas._objects.length);
        history?.splice(0, history.length);
        editor?.canvas.renderAll();
    };

    const onCropImage = () => {
        setCropImage((prev) => !prev);
    };

    const onAddLineChart = () => {
        // @ts-expect-error
        const chart = new fabric.Chart({
            width: 600,
            height: 300,
            option: {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        data: [150, 230, 224, 218, 135, 147, 260],
                        type: 'line',
                    },
                ],
            },
        });
        editor?.canvas?.add(chart);
    };

    return (
        <div className="flex flex-col h-[100vh] w-full p-4 bg-slate-100">
            <div className="flex h-[10%] justify-center items-center">
                <h1 className="text-2xl font-bold text-violet-500">
                    Charts Playground
                </h1>
            </div>
            <div className="flex gap-4 h-[90%] w-full">
                <div className="flex h-full w-[80%] bg-white p-4 relative">
                    {!cropImage ? (
                        <div className="absolute top-6 left-6 px-4 py-1 z-10 text-white bg-violet-300 rounded-md text-sm">
                            Zoom In/Out to Crop
                        </div>
                    ) : (
                        ''
                    )}
                    <FabricJSCanvas
                        className={`w-full h-full border-[1px] border-slate-200 ${
                            !cropImage ? 'border-violet-500 border-[2px]' : ''
                        }`}
                        onReady={onReady}
                    />
                </div>
                <div className="flex h-full w-[2px] bg-white"></div>
                <div className="flex h-full w-[20%] bg-white p-4">
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-col gap-2">
                            <h4 className="font-medium text-md text-violet-900">
                                Edit
                            </h4>

                            <ActionButton
                                label="Crop"
                                onClick={onCropImage}
                                isActive={!cropImage}
                            />

                            <ActionButton label="Undo" onClick={onUndo} />

                            <ActionButton label="Redo" onClick={onRedo} />

                            <ActionButton
                                label="Delete"
                                onClick={onDeleteSelectedObject}
                            />

                            <ActionButton label="Clear" onClick={onClear} />
                        </div>
                        <div className="flex w-full h-[2px] bg-slate-200 my-2" />
                        <div className="flex flex-col gap-2">
                            <h4 className="font-medium text-md text-violet-900">
                                Draw
                            </h4>
                            <ActionButton
                                label="Draw"
                                onClick={onToggleDraw}
                                isActive={isDrawingMode}
                            />
                        </div>
                        <div className="flex w-full h-[2px] bg-slate-200 my-2" />
                        <div className="flex flex-col gap-2">
                            <h4 className="font-medium text-md text-violet-900">
                                Shapes
                            </h4>

                            <ActionButton
                                label="Add Line"
                                onClick={onAddLine}
                            />
                        </div>
                        <div className="flex w-full h-[2px] bg-slate-200 my-2" />
                        <div className="flex flex-col gap-2">
                            <h4 className="font-medium text-md text-violet-900">
                                Charts
                            </h4>

                            <ActionButton
                                label="Add Line Chart"
                                onClick={onAddLineChart}
                            />
                        </div>
                        <div className="flex w-full h-[2px] bg-slate-200 my-2" />{' '}
                        <div className="flex flex-col gap-2">
                            <h4 className="font-medium text-md text-violet-900">
                                File
                            </h4>
                        </div>
                        <div className="flex w-full h-[2px] bg-slate-200 my-2" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChartPlayground;
