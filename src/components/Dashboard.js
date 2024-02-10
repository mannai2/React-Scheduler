import React, { useEffect } from 'react';
import ListA from './ListA';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject} from '@syncfusion/ej2-react-schedule';
import { DataManager,  UrlAdaptor } from '@syncfusion/ej2-data';

import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../node_modules/@syncfusion/ej2-schedule/styles/material.css";

function Dashboard() {
  useEffect(() => {
    // Retrieve user information from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    console.log(storedUser);

    if (storedUser) {
      const idM  = storedUser.idM;
      console.log('User ID:', idM);
    } else {
      console.log("error retreiving id");
    }
  }, []);

  const dataManager = new DataManager({
    url: 'http://localhost:8080/api/scheduleevents/getData',
    adaptor: new UrlAdaptor(),
    crossDomain: true
});
  return (
    <div className="App">
      <ScheduleComponent width='100%' height='650px' currentView='Month' eventSettings={{ dataSource: dataManager,
       fields: {
        id: 'id',
        subject: { name: 'subject' },
        isAllDay: { name: 'isallday' },
        location: { name: 'location' },
        description: { name: 'description' },
        startTime: { name: 'starttime' },
        endTime: { name: 'endtime' },
        startTimezone: { name: 'starttimezone' },
        endTimezone: { name: 'endtimezone' },
        recurrenceID: {name:'recurrenceid'},
        recurrenceRule:{name:'recurrencerule'},
        recurrenceException: {name:'recurrenceexception'},
        followingID:{name:'followingid'}
      } }}>
              <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
            </ScheduleComponent>
            <br></br>
      <ListA />
    </div>
  );
}

export default Dashboard;