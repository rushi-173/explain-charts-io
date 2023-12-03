import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import 'echarts-fabric'

const ChartPlayground = () => {

	const { editor, onReady } = useFabricJSEditor();


	const onAddLine = () => {
		if(!editor){
			return;
		}
		editor.addLine();
	}

	const onDeleteSelectedObject = () => {
		if(!editor){
			return;
		}
		if(editor.canvas.getActiveObject()){
			editor.canvas.remove(editor.canvas.getActiveObject());
		}
	};
	

	const onAddChart = () => {
		if(!editor){
			return;
		}
		// code to add chart
		
	}

	return (
		<div className="flex flex-col h-[100vh] w-full p-4 bg-slate-100">
			<div className="flex h-[10%] justify-center items-center">
				<h1 className="text-2xl font-bold text-violet-500">Charts Playground</h1>
			</div>
			<div className="flex gap-4 h-[90%] w-full">
				<div className="flex h-full w-[80%] bg-white p-4 relative">
					<FabricJSCanvas  className="w-full h-full border-[1px] border-slate-200" onReady={onReady} />
				</div>
				<div className="flex h-full w-[2px] bg-white"></div>
				<div className="flex h-full w-[20%] bg-white p-4">
					<div className="flex flex-col gap-2">
						<button className="border-slate-200 border-[1px] rounded-md px-3 py-1 text-sm" onClick={onAddLine}>Add line</button>
						<button className="border-slate-200 border-[1px] rounded-md px-3 py-1 text-sm" onClick={onAddChart}>Add Chart</button>
						<button className="border-slate-200 border-[1px] rounded-md px-3 py-1 text-sm" onClick={onDeleteSelectedObject}>Delete</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChartPlayground;
