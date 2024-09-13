export function settings() {
    return new Map([
      [
        'branches',
        {
          targetField: 'description',
          columns: [
            {name: 'name'},
            {name: 'description'},
            {name: 'code'},
            {name: 'regional_branch'},
            {name: 'active'},
            {name: 'abacus_id'},
          ],
          showColumns: ['description'],
        }
      ],
      [
        'credit_products',
        {
          targetField: 'name',
          columns: [{name: 'name'},{name: 'uid'},],
          showColumns: ['name'],
        }
      ],
      [
        'customers',
        {
          targetField: 'name',
          columns: [
            {name: 'name'},
            {name: 'birthday'},
            {name: 'gender'},
            {name: 'client_ID'},
            {name: 'INN'},
            {name: 'passport'},
            {name: 'passport_date'},
            {name: 'passport_details'},
            {name: 'branch'},
            {name: 'registration_address'},
            {name: 'registration_address_street'},
            {name: 'address'},
            {name: 'address_street'},
            {name: 'phone1'},
            {name: 'phone2'},
            {name: 'family_status'},
            {name: 'spouse'},
            {name: 'spouse_phone'},
          ],
          showColumns: ['name'],
        }
      ],
      [
        'currencies',
        {
          targetField: 'description',
          columns: [{name: 'name'},{name: 'description'},{name: 'uid'},],
          showColumns: ['description'],
        }
      ],
      [
        'currency_exchanges',
        {
          targetField: 'currency_from',
          columns: [
            {name: 'name'},
            {name: 'date'},
            {name: 'rate'},
            {name: 'currency_from'},
            {name: 'currency_to'}, 
          ],
          showColumns: ['currency_from'],
        }
      ],
      [
        'districts',
        {
          targetField: 'name',
          columns: [{name: 'name'},{name: 'town'},{name: 'active'},{name: 'abacus_id'},],
          showColumns: ['name'],
        }
      ],
      [
        'regions',
        {
          targetField: 'name',
          columns: [{name: 'name'},{name: 'active'},],
          showColumns: ['name'],
        }
      ],
      [
        'towns',
        {
          targetField: 'name',
          columns: [{name: 'name'},{name: 'region'},{name: 'active'},],
          showColumns: ['name'],
        }
      ],
      [
        'helpdesk_priorities',
        {
          targetField: 'name',
          columns: [{name: 'name'},{name: 'uid'},],
          showColumns: ['name'],
        }
      ],
      [
        'helpdesk_statuses',
        {
          targetField: 'name',
          columns: [{name: 'name'},{name: 'uid'},],
          showColumns: ['name'],
        }
      ],
      [
        'helpdesks',
        {
          targetField: 'name',
          columns: [
            {name: 'name'},
            {name: 'status'},
            {name: 'priority'},
            {name: 'branch'},
            {name: 'created'},
            {name: 'updated'},
            {name: 'created_by'},
            {name: 'updated_by'},
            {name: 'for_whom'},
            {name: 'description'},
          ],
          showColumns: ['name'],
        }
      ],
      [
        'reporthistories',
        {
          targetField: 'report',
          columns: [
            {name: 'report'},
            {name: 'created'},
            {name: 'generated_by'},
            {name: 'updated'},
            {name: 'info'},
            {name: 'duration'},
            {name: 'xlsx_report'},
          ],
          showColumns: ['report'],
        }
      ],
      [
        'reports',
        {
          targetField: 'report_name',
          columns: [
            {name: 'report_name'},
            {name: 'uid'},
            {name: 'category'},
            {name: 'description'},
          ],
          showColumns: ['report_name'],
        }
      ],
      [
        'client_decisions',
        {
          targetField: 'application_receipt_channel',
          columns: [
            {name: 'abacus_id'}, 
            {name: 'created_by'},
            {name: 'updated_by'},
            {name: 'created'},
            {name: 'application_receipt_channel'},
            {name: 'client_decision'},
            {name: 'customer_response'},
            {name: 'employee_comments'},
            {name: 'client_refused'},
            {name: 'missed_call'},
          ],
          showColumns: ['application_receipt_channel'],
        }
      ],
      [
        'credit_purposes',
        {
          targetField: 'name',
          columns: [{name: 'name'}, {name: 'code'},],
          showColumns: ['name'],
        }
      ],
      [
        'economic_activities',
        {
          targetField: 'name',
          columns: [{name: 'name'}, {name: 'active'},],
          showColumns: ['name'],
        }
      ],
      [
        'economic_activity_types',
        {
          targetField: 'name',
          columns: [{name: 'name'},{name: 'active'},{name: 'economic_activity'},],
          showColumns: ['name'],
        }
      ],
      [
        'rejection_reasons',
        {
          targetField: 'name',
          columns: [{name: 'name'},],
          showColumns: ['name'],
        }
      ],
      [
        'request_credits',
        {
          targetField: 'name',
          columns: [
            {name: "created"},
            {name: "name"},
            {name: "birthday"},
            {name: "gender"},
            {name: "credit_ID"},
            {name: "client_ID"},
            {name: "INN"},
            {name: "passport"},
            {name: "passport_details"},
            {name: "passport_date"},
            {name: "status"},
            {name: "branch"},
            {name: "address"},
            {name: "registration_address"},
            {name: "registration_address_street"},
            {name: "address_street"},
            {name: "created_by"},
            {name: "updated_by"},
            {name: "phone1"},
            {name: "phone2"},
            {name: "family_status"},
            {name: "family_number"},
            {name: "family_number_has_income"},
            {name: "spouse"},
            {name: "spouse_phone"},
            {name: "current_debt"},
            {name: "current_debt_name"},
            {name: "acted"},
            {name: "full_time_employees"},
            {name: "new_job"},
            {name: "information_source"},
            {name: "economic_activity"},
            {name: "economic_activity_type"},
            {name: "work_experience"},
            {name: "request_amount"},
            {name: "currency_new"},
            {name: "request_installment"},
            {name: "credit_purpose"},
            {name: "request_grace_period"},
            {name: "investment_sector"},
            {name: "activity_location"},
            {name: "education"},
            {name: "education_info"},
            {name: "monthly_income"},
            {name: "monthly_income_info"},
            {name: "monthly_household_expenses"},
            {name: "monthly_household_expenses_info"},
            {name: "monthly_payment_loans"},
            {name: "monthly_payment_loans_info"},
            {name: "monthly_profit_info"},
            {name: "total_business_assets"},
            {name: "total_business_assets_info"},
            {name: "client_capital"},
            {name: "client_capital_info"},
            {name: "total_household_assets"},
            {name: "total_household_assets_info"},
            {name: "status_change_date"},
            {name: "status_change_by"},
            {name: "approve_amount"},
            {name: "approve_installment"},
            {name: "approve_currency_new"},
            {name: "approve_interest"},
            {name: "approve_grace_period"},
            {name: "approve_issue_fee"},
            {name: "credit_product"},
            {name: "rating_internal"},
            {name: "rating_external"},
            {name: "approve_condition"},
            {name: "rejection_reason"},
            {name: "client_rejection_reason"},
            {name: "postponed_info"},
            {name: "decision_client"},
            {name: "customer"},
            {name: "underwriter_status"},
            {name: "underwriter_status_change_date"},
            {name: "underwriter_status_change_by"},
            {name: "result"},
          ],
          showColumns: ['name'],
        }
      ],
      [
        'request_statuses',
        {
          targetField: 'name',
          columns: [{name: 'name'}, {name: 'uid'},],
          showColumns: ['name'],
        }
      ],
      [
        'credit_scan_types',
        {
          targetField: 'name',
          columns: [{name: 'name'},{name: 'uid'},],
          showColumns: ['name'],
        }
      ],
      [
        'credit_scans',
        {
          targetField: 'created_by',
          columns: [
            {name: "file"},
            {name: "created"},
            {name: "created_by"},
            {name: "updated"},
            {name: "updated_by"},
            {name: "type"},
            {name: "abacus_id"},
            {name: "description"}
          ],
          showColumns: ['created_by'],
        }
      ],
      [
        'customer_scan_types',
        {
          targetField: 'name',
          columns: [{name: 'name'},{name: 'uid'},],
          showColumns: ['name'],
        }
      ],
      [
        'customer_scans',
        {
          targetField: 'created_by',
          columns: [
            {name: "file"},
            {name: "created"},
            {name: "created_by"},
            {name: "updated"},
            {name: "updated_by"},
            {name: "type"},
            {name: "abacus_id"},
            {name: "description"}
          ],
          showColumns: ['created_by'],
        }
      ],
      [
        'crifs',
        {
          targetField: 'generated_by',
          columns: [
            {name: "created"},
            {name: "generated_by"},
            {name: "request_credit"},
            {name: "abacus_customer_id"},
            {name: "abacus_credit_id"},
            {name: "abacus_account_number"},
            {name: "data"},
            {name: "crif_credit_id"},
            {name: "type"},
            {name: "parent"},
          ],
          showColumns: ['generated_by'],
        }
      ],
      [
        'scoringtypes',
        {
          targetField: 'name',
          columns: [{name: 'name'},{name: 'uid'},],
          showColumns: ['name'],
        }
      ],
      [
        'terminal_vendors',
        {
          targetField: 'name',
          columns: [{name: 'name'},],
          showColumns: ['name'],
        }
      ],
      [
        'terminals',
        {
          targetField: 'name',
          columns: [{name: 'name'},],
          showColumns: ['name'],
        }
      ],
      [
        'users',
        {
          targetField: 'get_full_name',
          columns: [
            {name: 'email'},
            {name: 'first_name'},
            {name: 'last_name'},
            {name: 'get_full_name'},
            {name: 'swift_loan_role'},
          ],
          showColumns: ['get_full_name'],
        }
      ],

    ])
}