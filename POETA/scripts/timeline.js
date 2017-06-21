
function exibirTimeline(d){
const element = document.getElementById('timelineGraf');
const data = [{
            label: 'Aluno 1',
            data: [{
                label: 'Atv 1',
                type: TimelineChart.TYPE.INTERVAL,
                from: new Date([2016, 5, 2]),
                to: new Date([2016, 5, 3])
            }, {
                label: 'Atv 2',
                type: TimelineChart.TYPE.INTERVAL,
                from: new Date([2016, 5, 4]),
                to: new Date([2016, 5, 5]),
                customClass: 'blue-interval'
            }]
        }, {
            label: 'Aluno 2',
            data: [{
                label: 'Atv 1',
                type: TimelineChart.TYPE.INTERVAL,
                from: new Date([2016, 5, 2]),
                to: new Date([2016, 5, 4]),
            }, {
                label: 'Atv 2',
                type: TimelineChart.TYPE.INTERVAL,
                from: new Date([2016, 5, 3]),
                to: new Date([2016, 5, 5]),
                customClass: 'blue-interval'
            }]
        }, {
            label: 'Aluno 3',
            data: [{
                label: 'Atv 1',
                type: TimelineChart.TYPE.INTERVAL,
                from: new Date([2016, 5, 2]),
                to: new Date([2016, 5, 3])
            }, {
                label: 'Atv 2',
                type: TimelineChart.TYPE.INTERVAL,
                from: new Date([2016, 5, 3]),
                to: new Date([2016, 5, 5]),
                customClass: 'blue-interval'
            }]
        }];

        const timeline = new TimelineChart(element, data, {
            enableLiveTimer: true,
            tip: function(d) {
                return d.at || `${d.from}<br>${d.to}`;
            }
        }).onVizChange(e => console.log(e));
}
