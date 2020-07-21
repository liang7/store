/**
 * 计算热力图正方形grid
 */
const heatmapGridHandler = ({ echartInstance, options, widget }) => {
  if (!widget || widget.widgetType !== 'heatMapT') {
    return options;
  }
  const width = echartInstance.getWidth();
  const height = echartInstance.getHeight();
  const { grid, orgGrid, xAxis, yAxis, heatmapTConfig } = options || {};

  if (!grid || !(heatmapTConfig || {}).square) {
    return options;
  }

  const { top: t, left: l, bottom: b, right: r } = orgGrid || {};
  const xAxisDataLen = (xAxis.data || xAxis[0].data || []).length;
  const yAxisDataLen = (yAxis.data || yAxis[0].data || []).length;
  const boxW = (width - l - r) / xAxisDataLen;
  const boxH = (height - t - b) / yAxisDataLen;

  let left: number;
  let right: number;
  let top: number;
  let bottom: number;

  if (boxW <= boxH) {
    const space = (height - boxW * yAxisDataLen - t - b) / 2;
    left = l;
    right = r;
    top = t + space;
    bottom = b + space;
  } else {
    const space = (width - boxH * xAxisDataLen - l - r) / 2;
    left = l + space;
    right = r + space;
    top = t;
    bottom = b;
  }
  if (Array.isArray(options.grid)) {
    options.grid[0].top = top;
    options.grid[0].left = left;
    options.grid[0].bottom = bottom;
    options.grid[0].right = right;
  } else {
    options.grid.top = top;
    options.grid.left = left;
    options.grid.bottom = bottom;
    options.grid.right = right;
  }

  return options;
};

export default heatmapGridHandler;
