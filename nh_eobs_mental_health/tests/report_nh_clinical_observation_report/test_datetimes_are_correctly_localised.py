# -*- coding: utf-8 -*-
"""
Module for TestDatetimesAreCorrectlyLocalised.
"""
from openerp.addons.nh_eobs.report import helpers
from openerp.tests.common import TransactionCase


class TestDatetimesAreCorrectlyLocalised(TransactionCase):
    """
    Integration test to check that all datetimes for observations are
    localised as expected.
    """
    def setUp(self):
        super(TestDatetimesAreCorrectlyLocalised, self).setUp()
        self.report_model = self.env['report.nh.clinical.observation_report']
        self.activity_model = self.env['nh.activity']
        self.test_utils = self.env['nh.clinical.test_utils']
        self.test_utils.create_patient_and_spell()
        self.test_utils.copy_instance_variables(self)

        # Create different obs types.
        self.blood_glucose_model = \
            self.env['nh.clinical.patient.observation.blood_glucose']
        self.blood_product_model = \
            self.env['nh.clinical.patient.observation.blood_product']
        self.weight_model = self.env['nh.clinical.patient.observation.weight']

        ews_obs_activity = self.test_utils\
            .create_and_complete_ews_obs_activity(
                self.patient.id, self.spell.id)

        blood_glucose_activity_id = self.blood_glucose_model.create_activity(
            {'parent_id': self.spell_activity.id},
            {
                'patient_id': self.patient.id,
                'blood_glucose': 40
            }
        )
        blood_product_activity_id = self.blood_product_model.create_activity(
            {'parent_id': self.spell_activity.id},
            {
                'patient_id': self.patient.id,
                'vol': 55,
                'product': self.blood_product_model._blood_product_values[0][0]
            }
        )
        weight_activity_id = self.weight_model.create_activity(
            {'parent_id': self.spell_activity.id},
            {
                'patient_id': self.patient.id,
                'weight': 70,
                'waist_measurement': 80
            }
        )

        self.activity_model.complete(blood_glucose_activity_id)
        self.activity_model.complete(blood_product_activity_id)
        self.activity_model.complete(weight_activity_id)

        blood_glucose_activity = \
            self.activity_model.browse(blood_glucose_activity_id)
        blood_product_activity = \
            self.activity_model.browse(blood_product_activity_id)
        weight_activity = self.activity_model.browse(weight_activity_id)

        datetime_utc = '2017-06-06 13:00:00'
        self.datetime_bst_formatted = '14:00 06/06/17'

        ews_obs_activity.date_terminated = datetime_utc
        blood_glucose_activity.date_terminated = datetime_utc
        blood_product_activity.date_terminated = datetime_utc
        weight_activity.date_terminated = datetime_utc

        ews_obs_activity.data_ref.date_terminated = datetime_utc
        blood_glucose_activity.data_ref.date_terminated = datetime_utc
        blood_product_activity.data_ref.date_terminated = datetime_utc
        weight_activity.data_ref.date_terminated = datetime_utc

        report_input_dict = {
            'spell_id': self.test_utils.spell.id,
            'start_date': '2017-06-05 12:00:00',
            'end_date': '2017-06-07 12:00:00'
        }
        report_input_obj = helpers.data_dict_to_obj(report_input_dict)

        self.report_data = self.report_model.get_report_data(report_input_obj)
        self.report_model.with_context({'tz': 'Europe/London'})\
            ._localise_and_format_datetimes(self.report_data)

    def test_datetimes_are_localised(self):
        """
        Datetimes are localised in the _localise_and_format_datetimes method
        of the report.nh.clinical.observation_report model.
        """
        expected_date_terminated_dict = {
            'ews_activity': self.datetime_bst_formatted,
            'ews': self.datetime_bst_formatted,
            'blood_glucoses': self.datetime_bst_formatted,
            'blood_products': self.datetime_bst_formatted,
            'weights': self.datetime_bst_formatted
        }
        actual_date_terminated_dict = {
            'ews_activity': None,
            'ews': None,
            'blood_glucoses': None,
            'blood_products': None,
            'weights': None
        }

        for obs_activity in self.report_data['ews']:
            actual_date_terminated_dict['ews_activity'] = \
                obs_activity['date_terminated']
            obs = obs_activity['values']
            actual_date_terminated_dict['ews'] = obs['date_terminated']

        for obs_activity in self.report_data['blood_glucoses']:
            obs = obs_activity['values']
            actual_date_terminated_dict['blood_glucoses'] = \
                obs['date_terminated']

        for obs_activity in self.report_data['blood_products']:
            obs = obs_activity['values']
            actual_date_terminated_dict['blood_products'] = \
                obs['date_terminated']

        for obs_activity in self.report_data['weights']:
            obs = obs_activity['values']
            actual_date_terminated_dict['weights'] = obs['date_terminated']

        self.assertEqual(expected_date_terminated_dict,
                         actual_date_terminated_dict)
