var _ = require('lodash')
    , assert = require('assert')
;
module.exports = {
    /**
     * The main entry point for the Dexter module
     *
     * @param {AppStep} step Accessor for the configuration for the step using this module.  Use step.input('{key}') to retrieve input data.
     * @param {AppData} dexter Container for all data used in this workflow.
     */
    run: function(step, dexter) {
        var data = require('./stations')
            , zipcode = step.input('zipcode').first()
            , maxDistance = step.input('distance').first() || 25
            , matches = []
            , record
        ;
        assert(zipcode, 'A single zipcode is required');
        record = data[zipcode + ''];
        if(!record || !record['stations']) {
            //Probably an inland zipcode, so ignore it
            return this.complete({});
        }
        _.each(record.stations, function(distance, station) {
            if(distance <= maxDistance) {
                matches.push({ station: station, distance: distance });
            }
        });
        this.complete(matches);
    }
};
