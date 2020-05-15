const physicalCycle = 23;
const emotionalCycle = 28;
const intellectualCycle = 33;
const spiritualCycle = 53;
const awarenessCycle = 48;
const aestheticCycle = 43;
const intuitionCycle = 38;

const pi = Math.PI;

// var value = Math.sin((2 * Math.PI * 8670) / 28);

const msPerDay = 1000 * 60 * 60 * 24;
const today = new Date().toISOString().slice(0, 10);

function dateDifference(from, to) {
        from = new Date(from);
        to = new Date(to);

        const utc1 = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate());
        const utc2 = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate());

        return Math.floor((utc2 - utc1) / msPerDay);
}


var difference = dateDifference("1996-08-19", today);

var value = Math.sin((2*pi*difference)/intellectualCycle);
console.log(value);


