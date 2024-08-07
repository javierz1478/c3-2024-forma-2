import eventosJSON from '../../../../dataset/historical_data.json'

exports.getHistoricalEvents = (ocurrence) => {
    let filtered_events = []
    if (ocurrence == 'ac'){
        filtered_events = eventosJSON.result.events.filter((evn) => evn.date < 0)
    } else if(ocurrence =='dc'){
        filtered_events = eventosJSON.result.events.filter((evn) => evn.date > 0)
    }
    return filtered_events
}