class Sensor {
    constructor(id) {
        this.id = id;
        this.powerStatus = 'off';
        this.status = 'waiting';
        this.reportingInterval = 10000;
    }

    turn(status) {
        if (this.powerStatus === 'off' && status === 'on') {
            this.powerStatus = 'on';
            this.status = 'idle';

            setTimeout(() => {
                this.status = 'sensingDistance';
                setTimeout(() => {
                    this.status = 'reportingData';
                    setTimeout(() => {
                        this.status = 'idle';
                    }, 1000);
                }, 500);
            }, this.reportingInterval);
        } else if (status === 'off') {
            this.powerStatus = 'off';
        } else throw new Error('Status not changed.');
    }
}

class IotServer {
    constructor() {
        this.sensor = [];
    }

    start([sensor]) {
        this.sensor.push(sensor); // 배열안에 json데이터가 와서 0번째를 push
    }

    publish({ deviceId, actionId, payload }) { // 구조 분해 할당
        for (let i = 0; i < this.sensor.length; i++) {
            if (this.sensor[i].id === deviceId) {
                if (this.sensor[i].powerStatus === 'on' && actionId === 'CHANGE_REPORTING_INTERVAL') {
                    this.sensor[i].reportingInterval = payload;
                }
            }
        }
    }
}

module.exports = {
    Sensor,
    IotServer,
};
