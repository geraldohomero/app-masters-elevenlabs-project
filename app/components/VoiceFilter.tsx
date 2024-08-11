import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

interface VoiceFilterProps {
  filters: { [key: string]: string[] };
  selectedFilters: { [key: string]: string };
  onFilterChange: (filterName: string, value: string) => void;
}

const VoiceFilter: React.FC<VoiceFilterProps> = ({ filters, selectedFilters, onFilterChange }) => {
  const sortedFilterNames = Object.keys(filters).sort();

  return (
    <div>
      {sortedFilterNames.map((filterName) => (
        <Select
          key={filterName}
          value={selectedFilters[filterName] || undefined}
          onChange={(value) => onFilterChange(filterName, value)}
          style={{ width: "50%" }}
          placeholder={`${filterName}`}
          allowClear
        >
          <Option value="">{`${filterName}`}</Option>
          {filters[filterName].map((value) => (
            <Option key={value} value={value}>
              {value}
            </Option>
          ))}
        </Select>
      ))}
    </div>
  );
};

export default VoiceFilter;