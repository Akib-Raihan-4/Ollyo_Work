export default function Header(props) {
  const { title, description } = props;
  return (
    <div className="header">
      <h1 className="title">Registration Form</h1>
      <p className="description">Please fill out this form with the required information</p>
    </div>
  );
}
