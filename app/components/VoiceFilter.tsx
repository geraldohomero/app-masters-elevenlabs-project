import React from 'react';
import { Select, Tag } from 'antd';

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
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {sortedFilterNames.map((filterName) => (
          <div key={filterName} style={{ flex: '50%' }}>
            <Select
              value={selectedFilters[filterName] || undefined}
              onChange={(value) => onFilterChange(filterName, value)}
              style={{ width: '100%' }}
              placeholder={`${filterName}`}
            >
              <Option value="">{`${filterName}`}</Option>
              {filters[filterName].map((value) => (
                <Option key={value} value={value}>
                  {value}
                </Option>
              ))}
            </Select>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '10px' }}>
        {Object.keys(selectedFilters).map((filterName) => (
          selectedFilters[filterName] && (
            <Tag
              key={filterName}
              closable
              onClose={() => onFilterChange(filterName, '')}
              style={{ marginRight: '10px', marginBottom: '10px' }}
            >
              {selectedFilters[filterName]}
            </Tag>
          )
        ))}
      </div>
    </div>
  );
};

export default VoiceFilter;