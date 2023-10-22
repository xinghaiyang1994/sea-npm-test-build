/**
 * stats 查看渲染性能的工具
 * 基础从 three/examples/jsm/libs/stats.module.js 复制
 */
declare const Stats: {
    (debugStatsFpsChange: any, debugStatsMsChange: any): {
        REVISION: number;
        dom: HTMLDivElement;
        addPanel: (panel: any) => any;
        showPanel: (id: any) => void;
        begin: () => void;
        end: () => number;
        update: () => void;
        domElement: HTMLDivElement;
        setMode: (id: any) => void;
    };
    Panel(name: any, fg: any, bg: any): {
        dom: HTMLCanvasElement;
        update: (value: any, maxValue: any) => void;
    };
};
export default Stats;
