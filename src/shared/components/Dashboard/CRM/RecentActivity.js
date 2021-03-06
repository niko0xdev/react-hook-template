import WidgetHeader from '@kongd/components/WidgetHeader';
import { Avatar, Timeline } from 'antd';
import React, { useEffect, useState } from 'react';

import ActivityItem from './ActivityItem';

const TimeLineItem = Timeline.Item;

function getName(task, shape) {
  if (task.avatar === '') {
    let nameSplit = task.name.split(' ');
    if (task.name.split(' ').length === 1) {
      const initials = nameSplit[0].charAt(0).toUpperCase();
      return (
        <Avatar shape={shape} className="kd-size-40 kd-bg-primary">
          {initials}
        </Avatar>
      );
    } else {
      const initials =
        nameSplit[0].charAt(0).toUpperCase() +
        nameSplit[1].charAt(0).toUpperCase();
      return (
        <Avatar shape={shape} className="kd-size-40 kd-bg-cyan">
          {initials}
        </Avatar>
      );
    }
  } else {
    return <Avatar shape={shape} className="kd-size-40" src={task.avatar} />;
  }
}

const RecentActivity = (props) => {
  const [limit, setLimit] = useState(3);
  const [shape, setShape] = useState(props.shape);

  useEffect(() => {
    setShape(props.shape);
    if (window.innerWidth < 575) {
      setLimit(1);
    }
  }, [props.shape]);

  const onLoadMore = () => {
    setLimit(limit + 1);
  };

  return (
    <div className="kd-entry-sec">
      <WidgetHeader title="Recent Activities" />
      {props.recentList.slice(0, limit).map((activity, index) => (
        <div className="kd-timeline-info" key={'activity' + index}>
          <h4 className="kd-timeline-info-day">{activity.day}</h4>
          <Timeline>
            {activity.tasks.map((task, index) => {
              return (
                <TimeLineItem
                  key={'timeline' + index}
                  mode="alternate"
                  dot={getName(task, shape)}
                >
                  <ActivityItem task={task} />
                </TimeLineItem>
              );
            })}
          </Timeline>
        </div>
      ))}
      <span className="kd-link kd-btn-link" onClick={onLoadMore}>
        Load More
      </span>
    </div>
  );
};

export default RecentActivity;
