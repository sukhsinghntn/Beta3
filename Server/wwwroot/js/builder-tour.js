window.initBuilderTour = () => {
  if (localStorage.getItem('df.builder.tour.seen')) return;
  if (!window.introJs) return;
  const steps = [];
  const toolbox = document.querySelector('#toolbox');
  if (toolbox) steps.push({ element: toolbox, intro: 'Drag fields from here to build your form.' });
  const canvas = document.querySelector('#sections-container');
  if (canvas) steps.push({ element: canvas, intro: 'Drop fields here. Each section holds your form fields.' });
  const toggle = document.querySelector('#previewToggle');
  if (toggle) steps.push({ element: toggle, intro: 'Switch between Edit Mode and Live Mode anytime.' });
  if (steps.length === 0) return;
  introJs().setOptions({ steps, showProgress: true }).oncomplete(() => {
    localStorage.setItem('df.builder.tour.seen', '1');
  }).onexit(() => {
    localStorage.setItem('df.builder.tour.seen', '1');
  }).start();
};
