/* global describe, it, beforeEach, before, afterEach, after, done */
"use strict";

var moment      = require('moment'),
    should      = require('should'),
    assert      = require('assert'),
    request     = require('supertest'),

    auto        = require('../../auto'),
    
    workflow1_config   = require('../samples/workflow1'),
    workflow2_config   = require('../samples/workflow2');



describe('Workflow Test', function(){
    it('First workflow test', function(done){
        var params = { num : 200}

        auto.execute_workflow(params, workflow1_config, function(err, res){
          if (err) throw err;
            res.status_code.should.equal(200)
          done();
        });
    });

    it('Second workflow test', function(done){
        auto.execute_workflow({}, workflow2_config, function(err, res){
          if (err) throw err;
            res.status_code.should.equal(200)
          done();
        });
    });

});
