import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const wrap = name => children =>
  <span>{name} [{children}]</span>;

const failSafe = type => () => (
  <span>
    Sorry, unable to parse this propType:
    <pre>{JSON.stringify(type, null, 2)}</pre>
  </span>
);

const removeQuotes = (str) => { // "''"
  let withoutQuotes = str.replace(/'/g, '');

  if (withoutQuotes) {
    withoutQuotes = <code>{ withoutQuotes }</code>;
  }

  return withoutQuotes;
};

const renderPropType = (type = {}) => {
  const typeHandlers = {
    custom: () => wrap('custom')(),

    enum: value => wrap('oneOf')(value.map((v, i, allValues) =>
      <span key={v.value}><code>{removeQuotes(v.value)}</code>{allValues[i + 1] && ', '}</span>)),

    union: value => wrap('oneOfType')(value.map((v, i, allValues) => (
      <span key={v.value}>
        {renderPropType(v)}
        {allValues[i + 1] && ', '}
      </span>
    ))),

    shape: value => wrap('shape')((
      <ul>
        { Object
          .keys(value)
          .map(key => ({ ...value[key], key }))
          .map(v => (
            <li key={v.key}>
              {v.key}:&nbsp;
              {renderPropType(v)}
              {v.required && <small><strong>&nbsp;required</strong></small>}
            </li>
          ))
        }
      </ul>
    )),

    arrayOf: value => wrap('arrayOf')(renderPropType(value)),
  };

  if (type.value) {
    return (typeHandlers[type.name] || failSafe(type))(type.value);
  }

  return <span>{type.name}</span>;
};

const AutoPropsApi = ({ component: Component }) => (
  <React.Fragment>
    { Component.__docgenInfo &&
      <ReactMarkdown source={Component.__docgenInfo.description} />
    }
    <h2>Available <code>props</code></h2>
    <table class="bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Default</th>
          <th>Required</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {
          Component.__docgenInfo &&

          Object.entries(Component.__docgenInfo.props).map(([name, value]) => (
            <tr key={name}>
              <td>{ name }</td>
              <td>{ renderPropType(value.type) }</td>
              <td>{ value.defaultValue && removeQuotes(value.defaultValue.value) }</td>
              <td>{ value.required ? 'Yes' : 'No' }</td>
              <td>{ value.description }</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </React.Fragment>
);

AutoPropsApi.propTypes = {
  component: PropTypes.instanceOf(Object).isRequired,
};

export default AutoPropsApi;
