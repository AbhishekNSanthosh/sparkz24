"use client"
import React, { useEffect, useState } from 'react';
import styles from '@styles/scss/registration.module.scss';
import { useParams, useRouter } from 'next/navigation';
import { eventRegistrationByBsc, getEventDetailsByToken } from '@/services/events/Event';
import { toast } from 'react-toastify';

export default function Registration() {
  const [category, setCategory] = useState("");
  const [count, setCount] = useState(1);
  const [event, setEvent] = useState({});
  const [limitCount, setLimitCount] = useState(1);
  const [eventName, setEventName] = useState("");
  const [error, setError] = useState(false);
  const [categoryRendered, setCategoryRendered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false)

  const params = useParams();
  const router = useRouter();

  //get data
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setToken(accessToken)
    if (accessToken) {
      getEventDetailsByToken(params?.id, setEvent, setIsRegistered, setLoading);
    } else {
      router.push('/');
      localStorage.clear();
    }
  }, [])
  console.log("event:", event)
  const [inputFields, setInputFields] = useState([
    { studentName: "", dob: "", category: "", school: "", schoolAddress: "", email: "", mobNo: "", semester: "", college: "" }
  ]);

  const addFields = () => {
    let newField = { studentName: '', dob: '', school: '', schoolAddress: '' };
    setInputFields([...inputFields, newField]);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    console.log(category)
  };

  const handleSubmit = () => {
    if (eventName === "battle_of_brains") {
      if (inputFields?.length !== 2) {
        toast.error("Please add a team mate", {
          position: "top-right",
          theme: "dark"
        })
        setError(true);
      } else {
        eventRegistrationByBsc(params?.id, inputFields, router, setLoading, event?.department)
      }
    } else if (eventName === "keam") {
      if (inputFields?.length !== 1) {
        setError(true);
      } else {
        eventRegistrationByBsc(params?.id, inputFields, router, setLoading, event?.department)
      }
    } else if (eventName === "science_safari") {
      eventRegistrationByBsc(params?.id, inputFields, router, setLoading, event?.department)
    } else {
      const additionalMembersNeeded = (event?.teamCountMin || 0) - (inputFields?.length || 0);
      if (additionalMembersNeeded <= 0) {
        console.log(inputFields)
        eventRegistrationByBsc(params?.id, inputFields, router, setLoading, event?.department);
      } else {
        toast.error("Add " + additionalMembersNeeded + " more members",
          {
            theme: "dark"
          });
      }
    }
  }

  const renderClassOptions = () => {
    if (category === "1") {
      return (
        <>
          <option value="5">Class V</option>
          <option value="6">Class VI</option>
          <option value="7">Class VII</option>
        </>
      );
    } else if (category === "2") {
      return (
        <>
          <option value="8">Class VIII</option>
          <option value="9">Class IX</option>
          <option value="10">Class X</option>
          <option value="11">Class XI</option>
          <option value="12">Class XII</option>
        </>
      );
    }
  };

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };

  useEffect(() => {
    if (params?.id === "662655157ad4722d57f16ae2") {
      setEventName("keam");
      setLimitCount(1)
    } else if (params?.id === "66263c4369855cbf3e7fe1a3") {
      setEventName("science_safari")
      setLimitCount(5)
    } else if (params?.id === "662654b07ad4722d57f16adf") {
      setEventName("battle_of_brains")
      setLimitCount(2)
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <div className={styles.row}>
          <div className={styles.form}>
            {inputFields.map((input, index) => (
              <div className={styles.formwrap} key={index}>
                <div className={styles.formTop}>
                  <span className={styles.formTitle}>
                    {eventName === "keam" ? "Student Details" : `Team Member ${index + 1}`}
                  </span>
                </div>
                {eventName === "science_safari" && (index === 0 || !categoryRendered) && // Render only for the first member or if not rendered yet
                  <>
                    <select
                      className={styles.txtField}
                      name="category"
                      value={input.category}
                      onChange={event => {
                        handleFormChange(index, event)
                        handleCategoryChange(event);
                        setCategoryRendered(true); // Set the flag to true after rendering for the first member
                      }}
                    >
                      <option value="0">Select Category</option>
                      <option value="1">Category 1</option>
                      <option value="2">Category 2</option>
                    </select>
                  </>
                }
                <div className={styles.DataRow}>
                  <input
                    className={styles.txtField}
                    name='studentName'
                    placeholder='Name'
                    value={input.studentName}
                    onChange={event => handleFormChange(index, event)}
                  />
                  {/* <input
                    className={styles.txtField}
                    name='age'
                    placeholder='Age'
                    value={input.age}
                    onChange={event => handleFormChange(index, event)}
                  /> */}
                  {params?.slug === "bsc" &&
                    <input
                      className={styles.txtField}
                      id='date'
                      placeholder='DD/MM/YYYY'
                      name='dob'
                      type='date'
                      value={input?.dob}
                      onChange={event => handleFormChange(index, event)}
                    />
                  }
                  {
                    eventName === "science_safari" &&
                    <select
                      className={styles.txtField}
                      name="class"
                      value={input.class}
                      onChange={event => handleFormChange(index, event)}
                    >
                      <option value="0">Select Class</option>
                      {renderClassOptions()}
                    </select>
                  }
                  {
                    eventName === "keam" &&
                    <select
                      className={styles.txtField}
                      name="class"
                      value={input.class}
                      onChange={event => handleFormChange(index, event)}
                    >
                      <option value="">Select Class</option>
                      <option value="12">Class XII</option>
                    </select>
                  }
                  {
                    eventName === "battle_of_brains" &&
                    <select
                      className={styles.txtField}
                      name="class"
                      value={input.class}
                      onChange={event => handleFormChange(index, event)}
                    >
                      <option value="">Select Class</option>
                      <option value="6">Class VI</option>
                      <option value="7">Class VII</option>
                      <option value="8">Class VIII</option>
                      <option value="9">Class IX</option>
                      <option value="10">Class X</option>
                      <option value="11">Class XI</option>
                      <option value="12">Class XII</option>
                      {/* <option value="Other">Other</option> */}
                    </select>
                  }
                  {params?.slug === "bsc" &&
                    <input
                      className={styles.txtField}
                      name='school'
                      placeholder='School'
                      value={input.school}
                      onChange={event => handleFormChange(index, event)}
                    />
                  }
                  {params?.slug === "bsc" &&
                    <input
                      className={styles.txtField}
                      name='schoolAddress'
                      placeholder='School Address'
                      value={input.schoolAddress}
                      onChange={event => handleFormChange(index, event)}
                    />
                  }
                  {event?.department !== "BSC" &&
                    <>
                      <input
                        className={styles.txtField}
                        placeholder='Email'
                        name='email'
                        type='email'
                        value={input?.email}
                        onChange={event => handleFormChange(index, event)}
                      />
                      <input
                        className={styles.txtField}
                        placeholder='Semester'
                        name='semester'
                        type='text'
                        value={input?.semester}
                        onChange={event => handleFormChange(index, event)}
                      />
                      <input
                        className={styles.txtField}
                        placeholder='College'
                        name='college'
                        type='text'
                        value={input?.college}
                        onChange={event => handleFormChange(index, event)}
                      />
                      <input
                        className={styles.txtField}
                        placeholder='Mobile number'
                        name='mobNo'
                        type='number'
                        value={input?.mobNo}
                        onChange={event => handleFormChange(index, event)}
                      />
                    </>
                  }
                </div>
              </div>
            ))}
            <div className={styles.actionRow}>
              {count < event?.teamCountMax && (
                <button className={styles.action} type='button' onClick={() => {
                  addFields();
                  setCount(count + 1);
                }}>Add another member..</button>
              )}
              <button disabled={loading} className={styles.submit} type='submit' onClick={(e) => { e.preventDefault(); handleSubmit() }}>{loading ? "Submitting" : "Submit"}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
